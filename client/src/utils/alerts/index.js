import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

// export const Swal = Swal.fire({
//   title: `¿Está seguro que desea?`,
//   icon: "warning",
//   showCancelButton: true,
//   confirmButtonColor: "orange",
//   cancelButtonColor: "#d33",
//   cancelButtonText: "Cancelar",
//   confirmButtonText: "Confirmar",
// });
