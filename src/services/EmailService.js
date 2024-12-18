
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();
const sendEmailCreateOrder = async (email, orderItems, totalPrice, paymentMethod, isPaid, PaidAt) => {
    const covertPrice = totalPrice.toLocaleString().replaceAll('.', '.')
    let transporter = nodemailer.createTransport({
        service: 'Gmail',//chọn service là Gmail nếu ko sẽ sai
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    let listItems = ''
    orderItems.forEach((item) => {
        listItems += `<div> 
            <div>Bạn đã đặt mua sản phẩm: <b>${item.name}<b/> </div>
            <div><img width={50} height={50} src=${item?.image} /> </div>
            <div>Số lượng : <b>${item.amount}<b/> </div>
            ${isPaid ? `<div>Bạn đã thanh toán bằng hình thức chuyển khoản</div>` :
                `<div>Thanh toán bằng tiền mặt : <b>${covertPrice}VND<b/> </div>`
            }
            <div>Đơn hàng của bạn sẽ được gửi đi sau 24h!</div>
            <b>Chúc quý khách một ngày tốt lành!</b>
        </div>`
    });

    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: email, // list of receivers
        subject: "Cám ơn , quý khách đã mua hàng tại Sneaker Asia.", // Subject line
        text: "Hello world?", // plain text body
        html: `<div>
                <b>Bạn đã đặt hàng thành công tại shop Sneaker Asia</b>${listItems}
            </div>`, // html body
    });


}
const sendEmailConfirmOrder = async (email, orderItems, totalPrice, paymentMethod, isPaid, PaidAt) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',//chọn service là Gmail nếu ko sẽ sai
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    let listItems = ''
    orderItems.forEach((item) => {
        listItems += `<div> 
            <div>Bạn đã đặt mua sản phẩm: <b>${item.name}<b/> </div>
            <div><img width={50} height={50} src=${item?.image} /> </div>
            <div>Số lượng : <b>${item.amount}<b/> </div>
            ${isPaid ? `<div>Bạn đã thanh toán bằng hình thức chuyển khoản</div>` :
                `<div>Thanh toán bằng tiền mặt : <b>${covertPrice}VND<b/> </div>`
            }
            <div>Đơn hàng của bạn đang được vận chuyển</div>
            <b>Chúc quý khách một ngày tốt lành!</b>
        </div>`
    });

    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: email, // list of receivers
        subject: "Cám ơn , quý khách đã mua hàng tại Sneaker Asia.", // Subject line
        text: "Hello world?", // plain text body
        html: `<div>
                <b>Bạn đã đặt hàng thành công tại shop Sneaker Asia</b>${listItems}
            </div>`, // html body
    });


}
module.exports = { sendEmailCreateOrder, sendEmailConfirmOrder}