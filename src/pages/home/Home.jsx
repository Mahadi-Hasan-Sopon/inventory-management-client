import { Helmet } from "react-helmet";
import { FaArrowRightLong } from "react-icons/fa6";
import Benefit1 from "../../assets/benefit-1.svg";
import Benefit2 from "../../assets/benefit-2.svg";
import Benefit3 from "../../assets/benefit-3.svg";
import Benefit4 from "../../assets/benefit-4.svg";
import Benefit5 from "../../assets/benefit-5.svg";
import Benefit6 from "../../assets/benefit-6.svg";
import Benefit7 from "../../assets/benefit-7.svg";
import Benefit8 from "../../assets/benefit-8.svg";
import Container from "../../components/shared/Container";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Inventory || Home</title>
      </Helmet>
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2">
        <div
          className="hero min-h-[50vh]"
          style={{
            backgroundImage:
              "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-70"></div>
          <div className="hero-content text-center text-white px-4 md:px-10 py-6 md:py-10">
            <div className="max-w-xl xl:max-w-max space-y-8">
              <h1 className="text-3xl md:text-5xl 2xl:text-7xl font-bold">
                The Complete Store management system for your business
              </h1>
              <p className="italic xl:text-xl">
                Powerful Store management software to manage accounting,
                inventory, billing, and many more in a single software
              </p>
              <button className="btn bg-[#FE9F43]/90 text-white xl:text-xl px-8 rounded-full">
                Get Started Now
              </button>
            </div>
          </div>
        </div>

        <div className="right w-full max-h-[60vh]">
          <img
            className="w-full h-full object-cover"
            src="https://i.ibb.co/0s8xW4Z/Kirana.jpg"
            alt=""
          />
        </div>
      </div>
      {/* Benefits */}
      <Container>
        <div className="benefits py-10 md:py-20">
          <h1 className="text-3xl font-bold text-center mb-16">
            Benefits of Store POS Software
          </h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            <div className="item1 flex flex-col items-center">
              <img className="h-20" src={Benefit1} alt="" />
              <div className="content flex flex-col items-center justify-center gap-2">
                <h3 className="text-base font-bold">Purchase Accurately</h3>
                <p className="text-sm px-10 text-center max-w-xs">
                  Higher inventory turnover, lower operating cost
                </p>
                <div className="flex-grow"></div>
                <button className="flex gap-1 items-center text-[#f0493f]">
                  <span className="block font-bold">Know more</span>{" "}
                  <FaArrowRightLong />
                </button>
              </div>
            </div>
            <div className="item2 flex flex-col items-center">
              <img className="h-20" src={Benefit2} alt="" />
              <div className="content flex flex-col items-center justify-center gap-2">
                <h3 className="text-base font-bold">Mobile billing</h3>
                <p className="text-sm px-10 text-center max-w-xs">
                  Beautiful front end for complex backend operations & analytics
                </p>
                <div className="flex-grow"></div>
                <button className="flex gap-1 items-center text-[#f0493f]">
                  <span className="block font-bold">Know more</span>{" "}
                  <FaArrowRightLong />
                </button>
              </div>
            </div>
            <div className="item3 flex flex-col items-center">
              <img className="h-20" src={Benefit3} alt="" />
              <div className="content flex flex-col items-center justify-center gap-2">
                <h3 className="text-base font-bold">Cloud POS</h3>
                <p className="text-sm px-10 text-center max-w-xs">
                  Easy & quick setup, secured offline, easily scale up
                </p>
                <div className="flex-grow"></div>
                <button className="flex gap-1 items-center text-[#f0493f]">
                  <span className="block font-bold">Know more</span>{" "}
                  <FaArrowRightLong />
                </button>
              </div>
            </div>
            <div className="item4 flex flex-col items-center">
              <img className="h-20" src={Benefit4} alt="" />
              <div className="content flex flex-col items-center justify-center gap-2">
                <h3 className="text-base font-bold">Get Omnichannel ready</h3>
                <p className="text-sm px-10 text-center max-w-xs">
                  Set-up your online store app and delivery management app
                  effortlessly
                </p>
                <div className="flex-grow"></div>
                <button className="flex gap-1 items-center text-[#f0493f]">
                  <span className="block font-bold">Know more</span>{" "}
                  <FaArrowRightLong />
                </button>
              </div>
            </div>
            <div className="item5 flex flex-col items-center">
              <img className="h-20" src={Benefit5} alt="" />
              <div className="content flex flex-col items-center justify-center gap-2">
                <h3 className="text-base font-bold">Digital ready</h3>
                <p className="text-sm px-10 text-center max-w-xs">
                  Payment, Loyalty, Bio-metric, Accounts
                </p>
                <div className="flex-grow"></div>
                <button className="flex gap-1 items-center text-[#f0493f]">
                  <span className="block font-bold">Know more</span>{" "}
                  <FaArrowRightLong />
                </button>
              </div>
            </div>
            <div className="item6 flex flex-col items-center">
              <img className="h-20" src={Benefit6} alt="" />
              <div className="content flex flex-col items-center justify-center gap-2">
                <h3 className="text-base font-bold">Compete effectively</h3>
                <p className="text-sm px-10 text-center max-w-xs">
                  CRM Loyalty (64 offers) / Cloud SMS / E-mail Alerts
                </p>
                <div className="flex-grow"></div>
                <button className="flex gap-1 items-center text-[#f0493f]">
                  <span className="block font-bold">Know more</span>{" "}
                  <FaArrowRightLong />
                </button>
              </div>
            </div>
            <div className="item7 flex flex-col items-center">
              <img className="h-20" src={Benefit7} alt="" />
              <div className="content flex flex-col items-center justify-center gap-2">
                <h3 className="text-base font-bold">Efficient Inventory</h3>
                <p className="text-sm px-10 text-center max-w-xs">
                  Standard, Assembly, Reorder, Repacking, Kit, Home delivery
                </p>
                <div className="flex-grow"></div>
                <button className="flex gap-1 items-center text-[#f0493f]">
                  <span className="block font-bold">Know more</span>{" "}
                  <FaArrowRightLong />
                </button>
              </div>
            </div>
            <div className="item8 flex flex-col items-center">
              <img className="h-20" src={Benefit8} alt="" />
              <div className="content flex flex-col items-center justify-center gap-2">
                <h3 className="text-base font-bold">Protect your margins</h3>
                <p className="text-sm px-10 text-center max-w-xs">
                  Fix margins based on Supplier or Product/Landing cost
                  calculation
                </p>
                <div className="flex-grow"></div>
                <button className="flex gap-1 items-center text-[#f0493f]">
                  <span className="block font-bold">Know more</span>{" "}
                  <FaArrowRightLong />
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-8 items-center justify-center mt-16">
            <button className="text-white bg-[#f0493f] rounded-full px-8 py-2.5 font-bold">
              Request a callback
            </button>
            <Link
              to="/dashboard/subscription"
              className="flex gap-1 items-center text-[#f0493f]"
            >
              <span className="block font-bold">Plans & Pricing</span>{" "}
              <FaArrowRightLong />
            </Link>
          </div>
        </div>
      </Container>

      <div className="show-case w-full bg-[url(https://i.ibb.co/rb49Yvp/vertical-cloud.jpg)] bg-no-repeat object-cover bg-cover min-h-[60vh] flex xl:justify-end justify-center items-center">
        <div className="bg-gray-950/40 text-white xl:bg-transparent min-h-[40vh] w-full sm:w-1/2 text-center py-10 xl:w-1/3 ps-4 flex flex-col gap-4 items-center justify-center sm:mr-10">
          <h2 className="text-3xl">
            Simple and easy <br /> cloud pos for your store
          </h2>
          <h4 className="text-xl font-bold">
            Now, {`it's "sign-up, set-up & serve"`}
          </h4>
          <button className="text-white bg-[#f0493f] rounded-full px-12 py-3 font-bold">
            Sign Up for Free
          </button>
        </div>
      </div>

      <div className="news-latter bg-[#FE9F43] w-full flex flex-col md:flex-row justify-center items-center gap-10 py-12 px-6">
        <h2 className="text-4xl font-bold text-white text-center md:text-left flex-1">
          Subscribe To Our NewsLetters
        </h2>
        <div className="flex justify-center items-center w-full md:w-1/2">
          <input
            type="email"
            name="news-letter"
            className="block bg-white text-slate-600 max-w-md w-full p-3 text-xl font-medium rounded-s placeholder:text-xl"
            placeholder="Enter your Email"
          />
          <button className="py-3 px-3 hover:cursor-pointer rounded-e font-semibold text-lg bg-white">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
