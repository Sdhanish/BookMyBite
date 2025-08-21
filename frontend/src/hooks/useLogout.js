import Swal from "sweetalert2";

export const handleLogout = async (logoutFunction, navigate) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, Logout",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await logoutFunction();
      navigate("/login");
      Swal.fire(
        "Logged out!",
        "You have been logged out successfully.",
        "success"
      );
    }
  });
};
