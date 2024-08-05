import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Pagination,
  Button,
} from "@nextui-org/react";
import { FaPencilAlt, FaTrash, FaPlus, FaFileExcel } from "react-icons/fa";
import MainModal from "../MainModal";
import Snackbar from "../Snackbar";
import ReservasiForm from "../Reservasi/ReservasiForm";
import statusReservasi from "@/constants/statusReservasi";
import { deleteReservasi, exportToExcelReservasi } from "@/services/reservasiService";
import { formatTime } from "@/utils/formatTime";
export default function ReservasiCells({ columns, users, onUpdate }) {
  const [openModal, setOpenModal] = React.useState(false);
  const [addReservasi, setAddReservasi] = React.useState(false);
  const [updatePasien, setUpdatePasien] = React.useState(false);
  const [selectReservasi, setSelectReservasi] = React.useState();
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    position: "bottom-center",
    variant: "success",
  });

  // pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  const pages = Math.ceil(users.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  const handleDeleteReservasi = async (id) => {
    try {
      await deleteReservasi(id).then(() => {
        setOpenModal(false);
        setSnackbar({
          open: true,
          message: "Berhasil menghapus reservasi",
          position: "top-center",
          variant: "success",
        });
        onUpdate(true);
      });
    } catch (error) {
      console.error("Error deleting reservasi:", error);
    }
  };
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "pasien":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user?.pasien?.email}
            name={user?.pasien?.nama.replace(/\b\w/g, (char) => char.toUpperCase())}
          >
            {user?.pasien?.nama}
          </User>
        );
      case "tanggal":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">{formatTime(user?.waktu_reservasi)}</p>
          </div>
        );
      case "keluhan":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">{user?.keluhan}</p>
          </div>
        );
      case "dokter":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">{user?.dokter?.nama}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            // @ts-ignore
            color={statusReservasi?.find((status) => status?.value === user?.status)?.color || "default"}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="items-center gap-6 flex justify-center">
            <Tooltip color="warning" content="Ubah Reservasi">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => {
                  setSelectReservasi(user.id);
                  setUpdatePasien(true);
                }}
              >
                <FaPencilAlt color="warning" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Hapus Reservasi">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => {
                  setSelectReservasi(user.id);
                  setOpenModal(true);
                }}
              >
                <FaTrash color="danger" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const handleExportToExcelReservasi = async () => {
    try {
      await exportToExcelReservasi().then((res) => {
        setSnackbar({
          open: true,
          message: "Exported successfully",
          position: "top-center",
          variant: "success",
        });
      });
    } catch (error) {
      console.error("Error exporting pasien:", error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Table
        aria-label="Custom cells"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
        </TableBody>
      </Table>
      <div className="flex gap-3">
        <Button color="primary" startContent={<FaPlus />} onClick={() => setAddReservasi(true)}>
          Tambah Reservasi
        </Button>
        <Button color="warning" startContent={<FaFileExcel />} onClick={() => handleExportToExcelReservasi()}>
          Ekspor Reservasi ke Excel
        </Button>
      </div>
      {/* <pre>{JSON.stringify(selectReservasi, null, 2)}</pre> */}
      <MainModal
        size="md"
        onOpen={openModal}
        onClose={() => setOpenModal(false)}
        onTrue={() => handleDeleteReservasi(selectReservasi)}
        title={"Konfirmasi Hapus Reservasi"}
        content={"Yakin ingin menghapus reservasi ini?"}
        showFooter={true}
        textTrue="Hapus"
        textFalse="Batal"
      />
      <MainModal
        size="md"
        onOpen={addReservasi}
        onClose={() => setAddReservasi(false)}
        onTrue={() => console.log("add")}
        title={"Buat Reservasi"}
        content={<ReservasiForm id={null} onClose={() => setAddReservasi(false)} onSuccess={(data) => onUpdate(data)} />}
        showFooter={false}
      />
      <MainModal
        size="md"
        onOpen={updatePasien}
        onClose={() => setUpdatePasien(false)}
        onTrue={() => console.log("update")}
        title={"Ubah Reservasi"}
        content={
          <ReservasiForm id={selectReservasi} onClose={() => setUpdatePasien(false)} onSuccess={(data) => onUpdate(data)} />
        }
        showFooter={false}
      />
      <Snackbar message={snackbar.message} show={snackbar.open} position={snackbar.position} variant={snackbar.variant} />
    </div>
  );
}
