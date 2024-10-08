import { Spinner } from "@nextui-org/spinner";
import DashboardLayout from "@/layouts/dashboard";

const HelpPage = () => {
  return (
    <DashboardLayout>
      <section className="w-full max-w-[580px] mx-auto flex flex-col h-full p-3">
        {/* Dashboard Header */}
        <div className="mb-6">
          <p className="text-2xl font-semibold text-primarymodecolorgray">
            Help Center
          </p>
          <p className="text-sm opacity-75">
            Get assistance with any questions or issues.
          </p>
        </div>

        {/* Help Sections */}
        <div className="space-y-6">
          {/* Email Support Form */}
          <div className="bg-card px-5 py-6 rounded-xl shadow-lg">
            <form
              action="mailto:xeonncodes@gmail.com"
              method="post"
              encType="text/plain"
              className="space-y-4"
            >
              <div>
                <p className="block text-sm ">Your Name</p>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full p-2 mt-2 border border-bordercolor rounded-md"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <p className="block text-sm ">Your Email</p>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full p-2 mt-2 border border-bordercolor rounded-md"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <p className="block text-sm ">Message</p>
                <textarea
                  name="message"
                  required
                  className="w-full p-2 mt-2 border border-bordercolor rounded-md"
                  rows={4}
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="px-6 text-[15px] py-2 bg-primary text-white rounded-full hover:bg-blue-700 transition-all"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default HelpPage;
