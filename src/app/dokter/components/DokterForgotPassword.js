import { Button, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { IoIosMail } from "react-icons/io";
import ShowMessage from "@/components/ShowMessage";
import { resetPasswordDokter } from "@/services/dokterService";

export default function DokterForgotPassword({ setClickRegister }) {
  const [form, setForm] = useState({
    email: null,
  });

  const [message, setMessage] = useState({
    open: false,
    message: "",
    variant: "",
  });

  const [loadingButton, setLoadingButton] = useState(false);

  const handleResetPassword = async () => {
    setLoadingButton(true);
    try {
      await resetPasswordDokter({
        email: form.email,
      }).then((res) => {
        setForm({
          email: null,
        });
        setMessage({
          open: true,
          message: res.message,
          variant: "success",
        });
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage({
        open: true,
        message: error.message,
        variant: "error",
      });
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <div className="flex flex-col p-4 gap-4">
      <ShowMessage
        open={message.open}
        message={message.message}
        variant={message.variant}
        onClose={() => setMessage({ ...message, open: false })}
      />
      <h1 className="text-md font-bold">Lupa Password</h1>
      <Input
        autoFocus
        endContent={<IoIosMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
        label="Email"
        placeholder="Masukkan email Anda"
        variant="bordered"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        value={form.email}
      />
      <Button color="primary" onClick={() => handleResetPassword()} isLoading={loadingButton} isDisabled={!form.email}>
        Lupa Password
      </Button>
      <div className="flex px-1 justify-between">
        <Link color="primary" size="sm" onClick={() => setClickRegister(false)}>
          Sudah memiliki akun?
        </Link>
      </div>
    </div>
  );
}
