const { OpenAI } = require("openai");
const fs = require("fs");
const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});
async function questionAI(message) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: message }],
    model: "ft:gpt-3.5-turbo-0125:personal::90th0ZTr",
  });
  return completion.choices[0].message.content;
  // console.log(completion.choices[0].message.content);
}
const { dockStart } = require("@nlpjs/basic");
async function nodeNLP(message) {
  const dock = await dockStart({ use: ["Basic"] });
  const nlp = dock.get("nlp");
  nlp.addLanguage("en");
  nlp.addLanguage("vi");
  // Adds the utterances and intents for the NLP
  nlp.addDocument("en", "Xin chào !", "greetings.hello");
  nlp.addDocument("en", "Chào bạn ", "greetings.hello");
  nlp.addDocument("en", "Chào  ", "greetings.hello");
  nlp.addDocument("en", "chào  ", "greetings.hello");
  nlp.addDocument("en", "Hello", "greetings.hello");
  nlp.addDocument(
    "en",
    "Cửa hàng có bán giày sneaker nào của Adidas không?",
    "greetings.adidas"
  );
  nlp.addDocument(
    "en",
    "Tôi có thể tìm thấy các mẫu giày Nike mới nhất ở đâu?",
    "greetings.nike"
  );
  nlp.addDocument(
    "en",
    "Có mẫu giày Air Jordan nào đang giảm giá không?",
    "greetings.discount"
  );
  nlp.addDocument("en", "Địa chỉ của shop bạn ở đâu ?", "greetings.address");
  nlp.addDocument("vi", "Địa chỉ của shop ", "greetings.address");
  nlp.addDocument("vi", "Địa chỉ", "greetings.address");
  nlp.addDocument(
    "en",
    "Làm sao để biết tôi đã đặt hàng thành công ở Sneaker Asia ?",
    "greetings.datThanhCong"
  );
  nlp.addDocument(
    "en",
    "Làm sao để biết  đặt hàng thành công ",
    "greetings.datThanhCong"
  );
  nlp.addDocument(
    "en",
    "Các số đo để theo dõi đơn hàng của tôi tại Sneaker Asia  ?",
    "greetings.follow"
  );
  nlp.addDocument(
    "en",
    "Chính sách bảo hành bên shop bạn ?",
    "greetings.baohanh"
  );
  nlp.addDocument(
    "en",
    "Tôi cao 1m60 đến 1m65 nặng 55-60kg thì mặc size nào ?",
    "greetings.tuVanSize"
  );
  nlp.addDocument("en", "Tôi  của sản phẩm bên bạn?", "greetings.size");
  nlp.addDocument(
    "en",
    "Làm thnàoế  cao 1m70 nặng 60kg thì mặc áo size nào?",
    "greetings.tuVanSize2"
  );
  nlp.addDocument(
    "en",
    "Áo bên shop bạn có giá từ bao nhiêu",
    "greetings.price"
  );
  nlp.addDocument(
    "en",
    "Làm sao để đặt hàng và biết đã đặt hàng thành công ?",
    "greetings.order"
  );
  nlp.addDocument(
    "en",
    "Tôi mua nhiều thì sẽ có ưu đãi gì không ?",
    "greetings.freeship"
  );
  nlp.addDocument("vi", "Bạn là gì ", "greetings.who");
  nlp.addDocument("vi", "Bạn là ai ", "greetings.who");
  nlp.addDocument("vi", "Có mấy hình thức thanh toán ", "greetings.pay");
  nlp.addDocument("vi", "Các hình thức thanh toán ", "greetings.pay");
  nlp.addDocument("vi", "Các hình thức thanh toán của shop ", "greetings.pay");
  nlp.addDocument("vi", "hình thức thanh toán của shop ", "greetings.pay");
  nlp.addDocument("vi", "Tôi có thể thanh toán qua đâu", "greetings.pay");
  nlp.addDocument("vi", "làm thế nào để thanh toán", "greetings.pay");

  nlp.addDocument("vi", "Số điện thoại để liên hệ ", "greetings.phone");
  nlp.addDocument("vi", "Số điện thoại ", "greetings.phone");
  nlp.addDocument("vi", "sdt để liên hệ", "greetings.phone");
  nlp.addDocument("vi", "sdt ", "greetings.phone");
  nlp.addDocument("vi", "email để có thể liên hệ ", "greetings.email");
  nlp.addDocument("vi", "email của shop bạn ", "greetings.email");
  nlp.addDocument("vi", "email  ", "greetings.email");
  nlp.addDocument("vi", "giày nike mới nhất", "greetings.nike");
  nlp.addDocument("vi", "giày nike", "greetings.nike");
  nlp.addDocument("vi", "làm sao để hủy đơn hàng", "greetings.huyDonHang");
  nlp.addDocument("vi", "cách hủy đơn hàng", "greetings.huyDonHang");
  nlp.addDocument("vi", "hủy đơn hàng như thế nào", "greetings.huyDonHang");
  nlp.addDocument("vi", "áo mlb", "greetings.aoMLB");
  nlp.addDocument("vi", "áo thun mlb", "greetings.aoMLB");
  nlp.addDocument("vi", "Có sản phẩm nào giảm giá không ?", "greetings.sale");
  nlp.addDocument("vi", "sản phẩm đang sale", "greetings.sale");
  nlp.addDocument("vi", "sale", "greetings.sale");
  nlp.addDocument("vi", "áo đang sale", "greetings.sale");
  nlp.addDocument("vi", "quần đang sale", "greetings.sale");
  nlp.addDocument("vi", "nón đang sale", "greetings.sale");
  nlp.addDocument("vi", "giày đang sale", "greetings.sale");
  nlp.addDocument("vi", "có giày nào đang giảm giá không", "greetings.sale");
  nlp.addDocument("vi", "có áo nào đang giảm giá không", "greetings.sale");
  nlp.addDocument("vi", "có quần nào đang giảm giá không", "greetings.sale");
  nlp.addDocument("vi", "có nón nào đang giảm giá không", "greetings.sale");
  nlp.addDocument("vi", "có balo nào đang giảm giá không", "greetings.sale");
  nlp.addDocument("vi", "giày đang giảm giá", "greetings.sale");
  nlp.addDocument("vi", "áo đang giảm giá", "greetings.sale");
  nlp.addDocument("vi", "quần đang giảm giá", "greetings.sale");
  nlp.addDocument("vi", "nón đang giảm giá", "greetings.sale");
  nlp.addDocument("vi", "balo đang giảm giá", "greetings.sale");
  nlp.addDocument(
    "vi",
    "tôi có thể xem các đơn hàng của tôi ở đâu",
    "greetings.detailOrder"
  );
  nlp.addDocument("vi", "cách xem lịch sử mua hàng", "greetings.detailOrder");
  nlp.addDocument("vi", "lịch sử mua hàng", "greetings.detailOrder");
  nlp.addDocument("vi", "xem đơn hàng của tôi ở đâu", "greetings.detailOrder");
  nlp.addDocument("vi", "ok bạn", "greetings.thanks");
  nlp.addDocument("vi", "cảm ơn", "greetings.thanks");
  nlp.addDocument("vi", "thanks", "greetings.thanks");
  nlp.addDocument("vi", "cám ơn bạn", "greetings.thanks");
  nlp.addDocument("vi", "bạn có fanpage facebook không", "greetings.facebook");
  nlp.addDocument("vi", "bạn có page fb không", "greetings.facebook");
  nlp.addDocument(
    "vi",
    "làm thế nào để xem fanpage fb của shop",
    "greetings.facebook"
  );
  nlp.addDocument("vi", "fb của shop là gì", "greetings.facebook");
  nlp.addDocument("vi", "facebook", "greetings.facebook");
  nlp.addDocument("vi", "fb ", "greetings.facebook");
  nlp.addDocument("vi", "Shop bạn có những gì ", "greetings.listProduct");
  nlp.addDocument("vi", "shop bạn có những gì ", "greetings.listProduct");
  nlp.addDocument("vi", "Shop bạn bán những gì", "greetings.listProduct");
  nlp.addDocument("vi", "Shop bạn có sản phẩm nào", "greetings.listProduct");
  nlp.addDocument("vi", "shop bạn có sản phẩm nào", "greetings.listProduct");
  nlp.addDocument("vi", "Những sản phẩm ở shop bạn", "greetings.listProduct");
  nlp.addDocument("vi", "Các sản phẩm ở nước bạn", "greetings.listProduct");
  nlp.addDocument(
    "vi",
    "Tôi có thể tìm kiếm sản phẩm như thế nào",
    "greetings.searchProduct"
  );

  await nlp.train();
  const response = await nlp.process("vi", message);
  return response.answer;
}
module.exports = { questionAI, nodeNLP };
