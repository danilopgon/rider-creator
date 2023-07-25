import os


def email_activation_text(username="", url=""):
    return f""" 
    Estimado/a {username}
    ¡Bienvenido/a a [Nombre de la empresa/organización]!
    Estamos encantados de que hayas decidido unirte a nuestra comunidad. Para comenzar a aprovechar al máximo nuestros servicios, es necesario que actives tu cuenta siguiendo unos sencillos pasos.
    Haz clic en el siguiente enlace de activación
    {os.getenv('BACK_URL')}activation/{url}
    """


def msg_activation(url="", username=""):
    html_email = f"""
    <html>
    <body>
        
        <div style="width: 100vw; height: 100vh; background:#1D232A;display: flex; flex-direction:column; align-items:center;gap: 2rem" >
            <p style="color: white; text-align:center; margin: 6rem 3rem 0 3rem"><strong>Estimado/a {username},</strong></br> 

                ¡Bienvenido/a a [Nombre de la empresa/organización]!</br> <br>
                 Estamos encantados de que hayas decidido unirte a nuestra comunidad. Para comenzar a aprovechar al máximo nuestros servicios, es necesario que actives tu cuenta siguiendo unos sencillos pasos.
            </p>
            <p style="text-align:center; color: white">Haz clic en el siguiente enlace de activación</p>
            <a href="{f"{os.getenv('BACK_URL')}activation/{url}"}" style="text-decoration:none; border:1px; padding: 8px; background:#641AE6; border-radius:10px;color:white; text-align: center; ">Activa tu cuenta</a>
            <p> Si no te has registrado, ignora este correo. </p>
            <p> Si no puedes acceder al enlace, copia y pega la siguiente dirección en tu navegador: {f"{os.getenv('FRONT_URL')}activation/{url}"}</p>
    </body>
        </div>
        
    </html>
    """
    return html_email
