import React, { useContext, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Link,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import firebaseApp from "@/firebase/config";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { createPasien, loginPasienWithEmailAndPassword } from "@/services/pasienService";
import { P } from "@/components/Font";
import { AuthContext } from "@/context/AuthContext";
import ShowMessage from "@/components/ShowMessage";
import DokterForgotPassword from "./DokterForgotPassword";
import { loginDokterWithEmailAndPassword } from "@/services/dokterService";

export default function LoginDokter() {
  const { login } = useContext(AuthContext);

  const { onOpenChange } = useDisclosure();
  const [clickRegister, setClickRegister] = useState(false);
  const [historyOfIllness, setHistoryOfIllness] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingLoginEmail, setLoadingLoginEmail] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [message, setMessage] = useState({
    open: false,
    message: "",
    variant: "",
  });
  const optionsHistoryOfIllness = [
    {
      value: "ada",
      label: "Ada",
    },
    {
      value: "tidak-ada",
      label: "Tidak Ada",
    },
  ];
  const [register, setRegister] = useState({
    nama: "",
    email: "",
    tanggal_lahir: "",
    nomor_telepon: "",
    alamat: "",
    diagnosis_terakhir: "",
    password: "",
    password_confirmation: "",
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [isVisible, setIsVisible] = useState({
    password: false,
    password_confirmation: false,
  });

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage({
      open: false,
      message: "",
      variant: "",
    });

    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Periksa apakah email pengguna ada di dokumen "pasien"
      const firestore = getFirestore(firebaseApp);
      const pasienRef = collection(firestore, "pasien");
      const q = query(pasienRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Email tidak ditemukan, logout pengguna
        await signOut(auth);
        setMessage({
          open: true,
          message: "Email not found. Please register first.",
          variant: "error",
        });

        setLoading(false);
        return;
      }

      console.log("Google login successful:", user);
      // Handle successful login, e.g., redirect to dashboard
      const userData = {
        uid: user.uid,
        email: user.email,
      };
      login(userData);
      setMessage({
        open: true,
        message: "Login successful",
        variant: "success",
      });
    } catch (error) {
      console.error("Error logging in with Google:", error);
      setMessage({
        open: true,
        message: error.message,
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      const registerData = {
        nama: register.nama,
        email: register.email,
        tanggal_lahir: register.tanggal_lahir,
        nomor_telepon: register.nomor_telepon,
        alamat: register.alamat,
        diagnosis_terakhir: historyOfIllness,
        password: register.password,
      };
      await createPasien(registerData).then((res) => {
        setMessage({
          open: true,
          message: "Berhasil daftar, silahkan login",
          variant: "success",
        });
        setClickRegister(false);
      });
    } catch (error) {
      console.error("Error registering:", error);
      setMessage({
        open: true,
        message: error.message,
        variant: "error",
      });
    }
  };

  const handleLogin = async () => {
    setLoadingLoginEmail(true);
    try {
      await loginDokterWithEmailAndPassword({
        email: loginForm.email,
        password: loginForm.password,
      }).then((res) => {
        login(res);
        setMessage({
          open: true,
          message: "Login successful",
          variant: "success",
        });
      });
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage({
        open: true,
        message: error.message,
        variant: "error",
      });
    } finally {
      setLoadingLoginEmail(false);
    }
  };

  return (
    <div className="flex m-24 p-24">
      <Modal isOpen={true} onOpenChange={onOpenChange} placement="center" hideCloseButton size="xl" scrollBehavior={"inside"}>
        <ModalContent>
          {() => (
            <>
              {!forgotPassword ? (
                <>
                  <ShowMessage
                    open={message.open}
                    message={message.message}
                    variant={message.variant}
                    onClose={() => setMessage({ ...message, open: false })}
                  />
                  <ModalHeader className="flex flex-col gap-1">{clickRegister ? "Daftar" : "Masuk"} sebagai Dokter</ModalHeader>
                  <ModalBody>
                    <>
                      <Input
                        autoFocus
                        endContent={<IoIosMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                        label="Email"
                        placeholder="Masukkan email Anda"
                        variant="bordered"
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        value={loginForm.email}
                      />
                      <Input
                        label="Password"
                        placeholder="Masukkan password Anda"
                        type={loginForm.showPassword ? "text" : "password"}
                        variant="bordered"
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={() => setLoginForm({ ...loginForm, showPassword: !loginForm.showPassword })}
                          >
                            {loginForm.showPassword ? (
                              <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <FaEye className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        value={loginForm.password}
                      />
                      <div className="flex px-1 justify-between">
                        <Link color="primary" size="sm" onClick={() => setForgotPassword(!forgotPassword)}>
                          Lupa Password?
                        </Link>
                      </div>
                    </>
                  </ModalBody>
                  <ModalFooter className="flex flex-col">
                    <Button
                      color="primary"
                      onClick={() => (clickRegister ? handleRegister() : handleLogin())}
                      fullWidth
                      disabled={loadingLoginEmail}
                      isLoading={loadingLoginEmail}
                    >
                      {clickRegister ? "Daftar" : "Masuk"}
                    </Button>
                    <P className="text-center text-sm mb-2">Atau</P>
                    {!clickRegister ? (
                      <Button color="secondary" onPress={handleGoogleLogin} disabled={loading}>
                        {loading ? "Logging in..." : "Login with Google"}
                      </Button>
                    ) : null}
                    <P className="text-center text-sm mb-2">
                      <Link color="primary" size="sm" href="/">
                        Kembali ke Home
                      </Link>
                    </P>
                  </ModalFooter>
                </>
              ) : (
                <DokterForgotPassword
                  setClickRegister={(e) => {
                    setClickRegister(e);
                    setForgotPassword(false);
                  }}
                />
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
