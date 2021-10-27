import sweetAlert, { SweetAlertResult } from 'sweetalert2';

const success = (text: string): Promise<SweetAlertResult<unknown>> =>
  sweetAlert.fire({
    icon: 'success',
    title: 'Sucesso',
    text,
  });

const error = (text: string): Promise<SweetAlertResult<unknown>> =>
  sweetAlert.fire({
    icon: 'error',
    title: 'Ops...',
    text,
  });

type AlertInfoParams = {
  title: string;
  text: string;
};

const info = ({
  text,
  title,
}: AlertInfoParams): Promise<SweetAlertResult<unknown>> =>
  sweetAlert.fire({
    icon: 'info',
    title,
    text,
  });

type AlertQuestionParams = {
  text: string;
  title?: string;
  focusCancelButton?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
};

const question = async ({
  text,
  title = 'Tem certeza?',
  cancelButtonText = 'Cancelar',
  focusCancelButton = true,
  confirmButtonText = 'OK',
}: AlertQuestionParams): Promise<{ answer: 'yes' | 'no' }> => {
  const result = await sweetAlert.fire({
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    cancelButtonText,
    cancelButtonColor: 'var(--danger)',
    focusCancel: focusCancelButton,
    confirmButtonText,
    reverseButtons: true,
  });

  return {
    answer: result.value ? 'yes' : 'no',
  };
};

const alert = {
  success,
  error,
  info,
  question,
};

export default alert;
