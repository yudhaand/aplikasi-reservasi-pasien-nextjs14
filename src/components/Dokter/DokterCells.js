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
import DokterForm from "../Dokter/DokterForm";
import { deleteDokter, exportToExcelDokters } from "@/services/dokterService";

const statusColorMap = {
  1: "success",
  2: "danger",
};

export default function DokterCells({ columns, users, onUpdate }) {
  const [openModal, setOpenModal] = React.useState(false);
  const [addDokter, setAddDokter] = React.useState(false);
  const [updateDokter, setUpdateDokter] = React.useState(false);
  const [selectDokter, setSelectDokter] = React.useState();
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

  const handleDeleteDokter = async (id) => {
    try {
      await deleteDokter(id).then((res) => {
        setOpenModal(false);
        setSnackbar({
          open: true,
          message: "Berhasil menghapus dokter",
          position: "top-center",
          variant: "success",
        });
        onUpdate(true);
      });
    } catch (error) {
      console.error("Error deleting pasien:", error);
    }
  };
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User avatarProps={{ radius: "lg", src: user.avatar }} name={user.nama}>
            {user.nama}
          </User>
        );
      case "spesialis":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{user.spesialisasi}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue === 1 ? "Aktif" : "Non-Aktif"}
          </Chip>
        );
      case "actions":
        return (
          <div className="items-center gap-6 flex justify-center">
            <Tooltip color="warning" content="Edit Dokter">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => {
                  setSelectDokter(user.id);
                  setUpdateDokter(true);
                }}
              >
                <FaPencilAlt color="warning" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Dokter">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => {
                  setSelectDokter(user.id);
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

  const handleExportToExcelDokters = async () => {
    try {
      await exportToExcelDokters().then((res) => {
        setSnackbar({
          open: true,
          message: "Exported successfully",
          position: "top-center",
          variant: "success",
        });
      });
    } catch (error) {
      console.error("Error exporting dokter:", error);
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
        <Button color="primary" startContent={<FaPlus />} onClick={() => setAddDokter(true)}>
          Tambah Dokter
        </Button>
        <Button color="warning" startContent={<FaFileExcel />} onClick={() => handleExportToExcelDokters()}>
          Ekspor Dokter ke Excel
        </Button>
      </div>
      {/* <pre>{JSON.stringify(page, null, 2)}</pre> */}
      <MainModal
        size="md"
        onOpen={openModal}
        onClose={() => setOpenModal(false)}
        onTrue={() => handleDeleteDokter(selectDokter)}
        title={"Konfirmasi Hapus Dokter"}
        content={"Yakin ingin menghapus dokter ini?"}
        showFooter={true}
        textTrue="Hapus"
        textFalse="Batal"
      />
      <MainModal
        size="md"
        onOpen={addDokter}
        onClose={() => setAddDokter(false)}
        onTrue={() => console.log("add")}
        title={"Tambah Dokter"}
        content={<DokterForm id={null} onClose={() => setAddDokter(false)} onSuccess={(data) => onUpdate(data)} />}
        showFooter={false}
      />
      <MainModal
        size="md"
        onOpen={updateDokter}
        onClose={() => setUpdateDokter(false)}
        onTrue={() => console.log("update")}
        title={"Edit Dokter"}
        content={<DokterForm id={selectDokter} onClose={() => setUpdateDokter(false)} onSuccess={(data) => onUpdate(data)} />}
        showFooter={false}
      />
      <Snackbar message={snackbar.message} show={snackbar.open} position={snackbar.position} variant={snackbar.variant} />
    </div>
  );
}
