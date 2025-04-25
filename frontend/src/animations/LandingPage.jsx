import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import useauthStore from "../contexts/store/authStore";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useauthStore();

  const handleSuggestRemedy = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/suggestion");
  };
  return (
    <>
      <div className="min-h-screen">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col mx-auto items-center w-full max-w-4xl px-6 md:px-14 pt-6 pb-6 mt-6"
        >
          <h1 className="font-bold text-3xl text-[#2AA831] text-center">
            🌿 Throwback to Mom’s Era?
          </h1>
          <h3 className="text-[#143117] mt-4 font-semibold text-center">
            Yup, no fancy skincare—just pure, natural remedies straight from
            nature. No harsh chemicals, just real results with nature’s
            goodness. It’s time to bring back that OG skincare wisdom, with
            remedies designed to nurture your skin the natural way 🌺
          </h3>
        </motion.div>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="flex flex-col mx-auto items-center w-full max-w-4xl px-6 md:px-14 pb-3 mt-5"
        >
          <h1 className="font-bold text-3xl text-[#2AA831] text-center">
            💡 Got a secret remedy?
          </h1>
          <h3 className="text-[#143117] mt-4 font-semibold text-center">
            Don’t gatekeep! Drop it in our suggestion box and let everyone glow
            up together. Share your grandma’s secret recipe or your own
            concoction—let’s make skincare fun, natural, and accessible for
            everyone 🌟
          </h3>
          <h1 className="font-bold text-xl text-[#143117] text-center mt-3">
            ⚠️ Know your skin! Always check for allergies before trying any
            remedy—your skin’s safety comes first!
          </h1>
          <button
            onClick={handleSuggestRemedy}
            className="mt-6 px-6 py-3 bg-[#238326] text-white font-semibold rounded-2xl hover:bg-[#2AA831] transition cursor-pointer"
          >
            Suggest a Remedy
          </button>
        </motion.div>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          className="flex flex-col mx-auto items-center w-full max-w-4xl px-6 md:px-14 pb-3 mt-5"
        >
          <h1 className="font-bold text-3xl text-[#238326] text-center">
            🌿 Nature’s Secrets at Your Fingertips! 🌿
          </h1>
          <h3 className="text-[#143117] mt-4 font-semibold text-center">
            All our remedies are gathered from the vast wisdom of the
            internet—because good skin tips are meant to be shared!✨ Curious
            about the magic behind your kitchen ingredients? 🍋 Head over to our
            blog page and dive into the amazing benefits of everyday homemade
            wonders! 💚
          </h3>
        </motion.div>
        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          className="flex flex-col mx-auto items-center w-full max-w-4xl px-6 md:px-14 pb-12 mt-8 text-center"
        >
          <h2 className="font-bold text-xl text-[#143117] mb-2">
            🤔 Don’t know what to search?
          </h2>
          <p className="text-[#143117] text-md font-medium">
            Start exploring topics like{" "}
            <span className="text-[#CFE6D0] font-semibold">tan,</span>{" "}
            <span className="text-[#CFE6D0] font-semibold">
              hyperpigmentation,
            </span>
            <span className="text-[#CFE6D0] font-semibold">face masks,</span>
            and{" "}
            <span className="text-[#CFE6D0] font-semibold">
              strawberry skin!
            </span>
            <br />
            More natural remedies will be added soon based on your suggestions
            🌱
          </p>
        </motion.div>
      </div>
    </>
  );
}
