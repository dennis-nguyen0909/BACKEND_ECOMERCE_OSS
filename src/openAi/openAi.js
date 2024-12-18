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
  nlp.addDocument(
    "vi",
    "Các cách tìm kiếm sản phẩm",
    "greetings.searchProduct"
  );
  nlp.addDocument("vi", "tìm kiếm", "greetings.searchProduct");
  nlp.addDocument("vi", "Tìm kiếm", "greetings.searchProduct");
  nlp.addDocument("vi", "tìm kiếm sản phẩm", "greetings.searchProduct");
  nlp.addDocument("vi", "Có các loại áo nào", "greetings.typeShirt");
  nlp.addDocument("vi", "Có các loại nón nào", "greetings.typeHat");
  nlp.addDocument("vi", "Giới thiệu cho tôi vài mẫu nón", "greetings.typeHat");
  nlp.addDocument("vi", "cho tôi xem vài mẫu nón", "greetings.typeHat");
  nlp.addDocument("vi", "các loại nón", "greetings.typeHat");
  nlp.addDocument("vi", "giới thiệu về bạn", "greetings.who");
  nlp.addDocument("vi", "bạn là ai", "greetings.who");
  nlp.addDocument("vi", "bạn là gì của shop", "greetings.who");
  nlp.addDocument("vi", "Có", "greetings.Yes");
  nlp.addDocument("vi", "Yes", "greetings.Yes");
  nlp.addDocument("vi", "Mình muốn hỏi bạn vài câu", "greetings.Yes");

  nlp.addDocument(
    "vi",
    "hãy cho tôi thông tin các loại áo",
    "greetings.typeShirt"
  );
  nlp.addDocument("vi", "gồm các loại áo nào", "greetings.typeShirt");
  nlp.addDocument("vi", "những loại áo nào", "greetings.typeShirt");
  nlp.addDocument("vi", "shop có các loại giày nào", "greetings.typeShoes");
  nlp.addDocument("vi", "Đó là những loại giày nào", "greetings.typeShoes");
  nlp.addDocument("vi", "hãy cho tôi xem các loại giày", "greetings.typeShoes");
  nlp.addDocument("vi", "các loại giày", "greetings.typeShoes");
  nlp.addDocument("vi", "hãy giới thiệu về shop bạn", "greetings.gioiThieu");
  nlp.addDocument("vi", "Thông tin về shop bạn", "greetings.gioiThieu");
  nlp.addDocument("vi", "Thông tin về shop bạn", "greetings.gioiThieu");
  nlp.addDocument("vi", "Sneaker Asia là gì", "greetings.gioiThieu");
  nlp.addDocument("vi", "shop bạn là gì", "greetings.gioiThieu");
  nlp.addDocument("vi", "thông tin của shop", "greetings.gioiThieu");
  nlp.addDocument("vi", "thông tin về shop", "greetings.gioiThieu");
  nlp.addDocument("vi", "thông tin của Sneaker Asia", "greetings.gioiThieu");
  nlp.addDocument("vi", "Áo thun là loại nào", "greetings.aothun");
  nlp.addDocument("vi", "Áo thun là các thương hiệu nào", "greetings.aothun");
  nlp.addDocument("vi", "cho tôi xem vài mẫu áo", "greetings.aothun");
  nlp.addDocument("vi", "các loại áo nào", "greetings.aothun");
  nlp.addDocument("vi", "các loại giày", "greetings.loaiGiay");
  nlp.addDocument("vi", "loại giày nào", "greetings.loaiGiay");
  nlp.addDocument("vi", "mẫu giày nào", "greetings.loaiGiay");
  nlp.addDocument("vi", "mẫu giày nào", "greetings.loaiGiay");
  nlp.addDocument("vi", "Có các loại giày nào", "greetings.loaiGiay");
  nlp.addDocument("vi", "sản phẩm mới", "greetings.new");
  nlp.addDocument("vi", "các sản phẩm mới nhất", "greetings.new");
  nlp.addDocument("vi", "áo thun nào mới nhất", "greetings.new");
  nlp.addDocument("vi", "loại giày nào mới nhất", "greetings.new");
  nlp.addDocument("vi", "các cách để tìm kiếm sản phẩm", "greetings.new");
  nlp.addDocument("vi", "Không", "greetings.No");
  nlp.addDocument("vi", "No", "greetings.No");
  nlp.addDocument("vi", "Mình không có câu hỏi", "greetings.No");
  nlp.addDocument("vi", "Tạm biệt", "greetings.goodBye");
  nlp.addDocument("vi", "gặp lại sau", "greetings.goodBye");
  nlp.addDocument("vi", "tạm biệt nhé", "greetings.goodBye");

  nlp.addDocument(
    "vi",
    "Dịch vụ chăm sóc khách hàng bên shop như thế nào",
    "greetings.cskh"
  );
  nlp.addDocument(
    "vi",
    "Dịch vụ chăm sóc khách hàng của shop như thế nào",
    "greetings.cskh"
  );
  nlp.addDocument("vi", "Dịch vụ chăm sóc khách hàng", "greetings.cskh");
  nlp.addDocument(
    "vi",
    "Dịch vụ chăm sóc khách hàng như thế nào",
    "greetings.cskh"
  );
  nlp.addDocument("vi", "Dịch vụ chăm sóc khách hàng ra sao", "greetings.cskh");
  nlp.addDocument(
    "vi",
    "Dịch vụ chăm sóc khách hàng bên bạn",
    "greetings.cskh"
  );
  nlp.addDocument(
    "vi",
    "shop bạn có những loại quần nào",
    "greetings.typePant"
  );
  nlp.addDocument(
    "vi",
    "shop bạn có những loại giày nào",
    "greetings.typeShoes"
  );
  nlp.addDocument("vi", "shop bạn có những loại áo nào", "greetings.typeShirt");
  // Train also the NLG
  nlp.addAnswer(
    "en",
    "greetings.hello",
    "Chào bạn, tôi có thể giúp gì được cho bạn, tôi là nhân viên của Sneaker Asia !"
  );
  nlp.addAnswer(
    "en",
    "greetings.adidas",
    "Có nhé , hiện chúng tôi có vài mẫu adidas bạn có thể tham khảo trên website!"
  );
  nlp.addAnswer(
    "en",
    "greetings.nike",
    "Bạn hãy vào thanh tìm kiếm và search thử nike xem sao nhé !"
  );
  nlp.addAnswer(
    "en",
    "greetings.discount",
    "Bạn hãy click vào giảm giá và xem thử nhé!"
  );
  nlp.addAnswer(
    "en",
    "greetings.size",
    "Đối với áo , quần thì size sẽ là S M L XL . Đối với nón thì sẽ có size 1 và size 2 . Đối với balo thì sẽ là 1 size duy nhất!"
  );
  nlp.addAnswer(
    "en",
    "greetings.address",
    "Hiện shop chỉ bán online nên chưa có địa chỉ offline , bạn hãy thông cảm nhé !"
  );
  nlp.addAnswer(
    "en",
    "greetings.freeship",
    "Có nhé , nếu bạn mua trên 500k sẽ được free ship . Và 10k ship khi mua từ 200k - 500k , 30k ship khi dưới 200k nhé!"
  );
  nlp.addAnswer(
    "en",
    "greetings.follow",
    "Bạn có thể theo dõi đơn hàng của bạn trong phần đơn hàng của tôi và sẽ có trạng thái đơn hàng của bạn tại Sneaker Asia"
  );
  nlp.addAnswer(
    "en",
    "greetings.baohanh",
    "Chính sách bên mình là 1 đổi 1 khi sản phẩm bị lỗi trong vòng 3 ngày sẽ được đổi lại nhưng phải còn đầy đủ tag nhé!"
  );
  nlp.addAnswer(
    "en",
    "greetings.tuVanSize",
    "Tôi khuyến khích bạn nên chọn size S tại Sneaker Asia "
  );
  nlp.addAnswer(
    "en",
    "greetings.tuVanSize2",
    "Đối với áo thì tôi khuyến khích bạn nên mang size XL nếu muốn rộng và L nếu muốn vừa tại Sneaker Asia "
  );
  nlp.addAnswer(
    "en",
    "greetings.price",
    "Hiện áo bên shop tôi thì áo thun sẽ có giá từ 450k trở lên và áo sweater sẽ có giá từ 650k trở lên"
  );
  nlp.addAnswer(
    "en",
    "greetings.order",
    "Trước tiên bạn sẽ cần phải đăng nhập / đăng ký (nếu chưa có tài khoản) . Sau đó bạn sẽ click vào sản phẩm bạn muốn mua và click thêm vào giỏ hàng , đi tiếp đến thanh toán và thanh toán. Sau khi thanh toán sẽ có email gửi về xác nhận cho bạn, bạn có thể theo dõi đơn hàng trong mục đơn hàng của tôi ."
  );
  nlp.addAnswer(
    "vi",
    "greetings.who",
    "Tôi là  trợ lý của Sneaker Asia , tôi sẽ giải đáp các thắc mắc của bạn !"
  );
  nlp.addAnswer(
    "vi",
    "greetings.phone",
    "Bạn có thể liên hệ qua số 0898151737 ."
  );
  nlp.addAnswer(
    "vi",
    "greetings.email",
    "Bạn có thể liên hệ qua email sau : dennis.nguyen0909@gmail.com "
  );
  nlp.addAnswer(
    "vi",
    "greetings.huyDonHang",
    "Bạn ấn vào avatar của bạn và click vào đơn hàng của tôi và ấn hủy đơn hàng bạn muốn.Nhưng nếu đơn hàng đã được xác nhận và đang trong quá trình giao thì sẽ không được hủy ."
  );
  nlp.addAnswer(
    "vi",
    "greetings.datThanhCong",
    "Khi bạn đặt hàng thành công sẽ có email gửi về cho email của bạn ."
  );
  nlp.addAnswer(
    "vi",
    "greetings.aoMLB",
    "Hiện áo thun MLB có giá từ 450k trở lên bạn có thể xem trong mục Sản phẩm / áo thun nhé ."
  );
  nlp.addAnswer(
    "vi",
    "greetings.sale",
    "Để xem sản phẩm đang giảm giá bạn có thể vào trong mục Giảm Giá để xem nhé !"
  );
  nlp.addAnswer(
    "vi",
    "greetings.pay",
    "Hiện cửa hàng chúng tôi cho phép thanh toán qua 2 hình thức gồm : thanh toán bằng tiền mặt / thanh toán qua paypal"
  );
  nlp.addAnswer(
    "vi",
    "greetings.detailOrder",
    "Bạn có thể xem đơn hàng của bạn bằng cách click vào avatar và đơn hàng của tôi . Click vào chi tiết để xem chi tiết hơn đơn hàng ."
  );
  nlp.addAnswer(
    "vi",
    "greetings.thanks",
    "Không có gì. Bạn còn câu hỏi nào không ?"
  );
  nlp.addAnswer(
    "vi",
    "greetings.listProduct",
    "Hiện shop đang có các sản phẩm như áo , quần , giày , nón , balo .Bạn có thể tham khảo trong website nhé!"
  );
  nlp.addAnswer(
    "vi",
    "greetings.facebook",
    "Tất nhiên là có . Bạn có thể lướt xuống cùng và click vào facebook trong footer nhé !"
  );
  nlp.addAnswer(
    "vi",
    "greetings.searchProduct",
    "Có 2 cách tìm kiếm . Tìm kiếm bằng cách seach hoặc tìm kiếm bằng giọng nói"
  );
  nlp.addAnswer(
    "vi",
    "greetings.typeShirt",
    "Hiện bên shop gồm các loại áo thun , áo khoác , áo hoodie . Bạn có thể tham khảo trong mục sản phẩm nhé"
  );
  nlp.addAnswer(
    "vi",
    "greetings.typePant",
    "Hiện bên shop gồm các loại quần ngắn , quần dài .Bạn có thể tham khảo trong mục sản phẩm nhé"
  );
  nlp.addAnswer(
    "vi",
    "greetings.typeShoes",
    "Hiện bên shop gồm các loại giày như là giày nike , giày adidas , giày samba , giày mlb và .... Bạn hãy tham khảo thử nhé !"
  );
  nlp.addAnswer(
    "vi",
    "greetings.gioiThieu",
    "Chào mừng đến với Sneaker Asia - nơi kết nối đam mê và phong cách trong thế giới của giày thể thao và quần áo. Tại Sneaker Asia, chúng tôi không chỉ cung cấp những đôi giày chất lượng cao từ các thương hiệu hàng đầu trên thị trường, mà còn là điểm đến của sự sáng tạo và sự cá nhân hóa.Hãy khám phá thế giới của Sneaker Asia ngay hôm nay và biến đôi giày của bạn thành một tuyên bố phong cách không thể phủ nhận!"
  );
  nlp.addAnswer(
    "vi",
    "greetings.typeHat",
    "Nón bên shop hiện chưa có đa dạng nên chỉ có vài mẫu nón như MLB bạn có thể xem tham khảo trong sản phẩm của chúng tôi !"
  );
  nlp.addAnswer(
    "vi",
    "greetings.aothun",
    "Áo thun thì gồm các loại áo MLB và nhiều màu khác nhau .Bạn hãy vào website xem nhé!"
  );
  nlp.addAnswer(
    "vi",
    "greetings.loaiGiay",
    "Bên shop gồm các loại giày như : Samba , Adidas , Nike , MLB ....."
  );
  nlp.addAnswer(
    "vi",
    "greetings.cskh",
    "Tại chúng tôi, dịch vụ chăm sóc khách hàng không chỉ là một trách nhiệm, mà còn là cam kết của chúng tôi để đảm bảo mọi trải nghiệm của bạn là hoàn hảo nhất có thể. Chúng tôi hiểu rằng bạn là một phần không thể thiếu trong thành công của chúng tôi, và vì vậy, chúng tôi cam kết cung cấp cho bạn sự chăm sóc tận tâm và chuyên nghiệp.Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng lắng nghe và giải quyết mọi thắc mắc hay yêu cầu từ bạn. Với sự am hiểu sâu sắc về sản phẩm và dịch vụ của chúng tôi, họ sẽ giúp bạn tìm ra giải pháp phù hợp nhất để đáp ứng nhu cầu của bạn.Chúng tôi luôn đặt khách hàng lên hàng đầu và luôn xem xét mọi phản hồi và góp ý để cải thiện dịch vụ của chúng tôi. Với chúng tôi, không có gì quan trọng hơn việc đảm bảo bạn cảm thấy hài lòng và tin tưởng khi sử dụng sản phẩm và dịch vụ của chúng tôi.Hãy để chúng tôi chăm sóc bạn, và để chúng tôi biến mọi trải nghiệm của bạn trở nên đáng nhớ và thú vị!"
  );
  nlp.addAnswer(
    "vi",
    "greetings.new",
    "Hiện các sản phẩm mới bên shop sẽ hiển thị tại trang chủ chính thức bạn hãy lướt xuống và xem nhé !"
  );
  nlp.addAnswer(
    "vi",
    "greetings.Yes",
    "Tất nhiên rồi bạn hãy đặt câu hỏi mình sẽ giải đáp cho nhé !"
  );
  nlp.addAnswer(
    "vi",
    "greetings.No",
    "Vậy cũng tốt thôi , chúc bạn 1 ngày tốt lành !"
  );
  nlp.addAnswer("vi", "greetings.goodBye", "Tạm biệt nhé , hẹn gặp lại sau !");
  await nlp.train();
  const response = await nlp.process("vi", message);
  return response.answer;
}
module.exports = { questionAI, nodeNLP };
