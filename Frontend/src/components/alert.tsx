import Swal from "sweetalert2";

export const sweetAlert = (
    title: string,
    message: string,
    icon: "success" | "error" | "warning" | "info" | "question" = "success"
) => {
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        confirmButtonText: '👍 OK!',
    });
};