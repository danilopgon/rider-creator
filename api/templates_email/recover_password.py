import os


def msg_recovery(url="", username=""):
    html_email = f"""
   <html>

<body>

    <div
        style="width: 100vw; height: 100vh; background:#1D232A;display: flex; flex-direction:column; align-items:center;gap: 2rem">
        <p style="color: white; text-align:center; margin: 6rem 3rem 0 3rem"><strong>Estimado/a
                {username},</strong></br>
            ¿Necesitas cambiar tu contraseña?

        </p>
        <p style="text-align:center; color: white">Haz clic en el siguiente enlace para recuperarla</p>
        <a href="{f" {os.getenv('BACK_URL')}api/auth/recover-password/{url}"}"
            style="text-decoration:none; border:1px; padding: 8px; background:#641AE6; border-radius:10px;color:white; text-align: center; ">Active
            your account</a>
        <p> Si no te has registrado, ignora este correo. </p>
        <p> Si no puedes acceder al enlace, copia y pega la siguiente dirección en tu navegador:
            {f"{os.getenv('BACK_URL')}api/auth/recover-password/{url}"}</p>
    </div>

</body>

</html>
    """
    return html_email
