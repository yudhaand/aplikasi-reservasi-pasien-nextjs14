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
import { FaPencilAlt, FaTrash, FaPlus } from "react-icons/fa";
import MainModal from "../MainModal";
import Snackbar from "../Snackbar";
import ReservasiForm from "../Reservasi/ReservasiForm";
import statusReservasi from "@/constants/statusReservasi";
import { deleteReservasi } from "@/services/reservasiService";
import { formatTime } from "@/utils/formatTime";
import PasienReservasiForm from "./PasienReservasiForm";
export default function PasienReservasiCells({ columns, users, onUpdate }) {
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
      await deleteReservasi(id).then((res) => {
        setOpenModal(false);
        setSnackbar({
          open: true,
          message: res.message,
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
          <User avatarProps={{ radius: "lg", src: user.avatar }} description={user?.pasien?.email} name={user?.pasien?.nama}>
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
      default:
        return cellValue;
    }
  }, []);

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
      <div className="flex justify-between">
        <Button color="primary" startContent={<FaPlus />} onClick={() => setAddReservasi(true)}>
          Buat Reservasi
        </Button>
      </div>
      {/* <pre>{JSON.stringify(selectReservasi, null, 2)}</pre> */}
      <MainModal
        size="md"
        onOpen={addReservasi}
        onClose={() => setAddReservasi(false)}
        onTrue={() => console.log("add")}
        title={"Buat Reservasi"}
        content={<PasienReservasiForm id={null} onClose={() => setAddReservasi(false)} onSuccess={(data) => onUpdate(data)} />}
        showFooter={false}
      />
      <Snackbar message={snackbar.message} show={snackbar.open} position={snackbar.position} variant={snackbar.variant} />
    </div>
  );
}
