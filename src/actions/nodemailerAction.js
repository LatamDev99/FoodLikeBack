const nodemailer = require("nodemailer")
const { EMAIL_PASSWORD  } = process.env

const createMailTransporter = () => {
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "gilberto.castano@outlook.es",
            pass: EMAIL_PASSWORD
        }
    });

    return transporter
};

const sendVerificationEmail = (user) => {
    const transporter = createMailTransporter();

    const mailOptions = {
        from: "Food Like <gilberto.castano@outlook.es>",
        to: user.correo,
        subject: `Verifica tu correo`,
        html: `
            <p> 
                Hola ${user.nombre}, gracias por elegirnos, presiona el botón para verificar tu correo y activar tu cuenta
            <p>
            <a href='http://localhost:3000/cliente/verify?token=${user.emailToken}'>
                Verificar mi correo
            </a>
        `
    }

    transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log(err);
            }else{
                console.log("email send");
            }
    })
};

const sendWelcomeEmail = (user) => {
    const transporter = createMailTransporter();

    const mailOptions = {
        from: "Food Like <gilberto.castano@outlook.es>",
        to: user.correo,
        subject: `Vienbenido ${user.nombre}`,
        html: `
            <p> 
                Hola ${user.nombre}, vienbenido a Food like, gracias por elegirnos
            <p>
        `
    }

    transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log(err);
            }else{
                console.log("email send");
            }
    })
}

module.exports = {
    createMailTransporter,
    sendVerificationEmail,
    sendWelcomeEmail
}