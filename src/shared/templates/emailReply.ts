export const emailReply = (
  ticketId: number,
  subject: string,
  agentName: string,
  userName: string,
  content: string,
): string => `
<!DOCTYPE html>
<html style="height: 100%">

<head>
  <meta charset="utf-8" />
  <title>Resposta ao seu chamado</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
    }
  </style>
</head>

<body style="font-family: Arial, sans-serif; font-size: 16px; height: 100%">
  <table width="100%" height="100%" bgcolor="#f3faff" cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <table width="600" align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding: 15px 0; text-align: center">
              <h1 style="color: #2271a1">Seu chamado foi respondido</h1>
            </td>
          </tr>
          <tr>
            <td style="background-color: #ffffff; padding: 30px">
              <p>Olá, ${userName}</p>

              <p>
                Estamos entrando em contato para informar que o chamado
                #${ticketId} - ${subject} foi respondido. Confira abaixo a
                resposta da nossa equipe:
              </p>

              <blockquote style="
                    border-left: 4px solid #ccc;
                    margin: 20px 0;
                    padding: 10px 0 10px 20px;
                  ">
                ${content}
                <cite style="display: block; margin-top: 10px">- ${agentName}</cite>
              </blockquote>

              <div style="text-align: center">
                <a href="http://portal.exatoconsultoria.com.br/tickets/${ticketId}" style="
                      background-color: #2271a1;
                      border: none;
                      color: white;
                      padding: 12px 24px;
                      text-align: center;
                      text-decoration: none;
                      display: inline-block;
                      font-size: 16px;
                      margin-top: 30px;
                      cursor: pointer;
                      border-radius: 5px;
                    ">
                  Acessar chamado
                </a>
              </div>

              <p>Atenciosamente,<br />Exato Inovações e Soluções em TI</p>
              <hr />

              <div style="text-align: center;">
                <span style="font-size: 11px;">Esse e-mail foi enviado automaticamente, por favor, não responda. </span>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>

</html>


`;
