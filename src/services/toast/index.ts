import Swal, { SweetAlertResult } from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

type ShowToastParams = {
  icon: 'success' | 'error' | 'info' | 'warning';
  text: string;
};

const showToast = ({
  icon,
  text,
}: ShowToastParams): Promise<SweetAlertResult<unknown>> =>
  Toast.fire({
    icon,
    title: text,
  });

export default showToast;
