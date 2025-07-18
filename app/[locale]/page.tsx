"use client";
import { NavLink } from "@/components/nav-link";
import { SelectLang } from "@/components/select-lang";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { inviteUserAsParentAction, loginAction } from "@/server/actions";
import { IWebApp } from "@/types/telegram";
import { toast } from "sonner";
import { handleNavigation } from "@/lib/navigation";
import { useParams, useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { saveToken, saveUserAndId } from "@/server/actions/authActions";
import { useGetToken } from "@/hooks/useToken";

export default ({ local = "" }) => {
  const t = useTranslations("intro");
  const t_login = useTranslations("user-login");
  const locale = useLocale();
  const params = useParams();

  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const { data: token, isLoading: tokenLoading } = useGetToken();
  const router = useRouter();

  const h = useTranslations("home");
  const swiperRef = useRef<any>(null);
  const nextStep = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext(); // Move to next slide
    }
  };
  const prevStep = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev(); // Move to previous slide
    }
  };
  const steps = [1, 2, 3, 4, 5, 6];

  const [initData, setInitData] = useState("");
  useEffect(() => {
    const initData = window.Telegram.WebApp.initData;
    setInitData(initData);
  }, []);

  function loginUserAs(role: string) {
    startTransition(async () => {
      const result = await loginAction(initData);
      console.log("🚀 ~ startTransition ~ result:", result);
      if (result) {
        await saveToken(result.data.access_token);
        await saveUserAndId({
          username: result.data.user.username,
          user_id: result.data.user.user_id,
          name: `${result.data.user.first_name} ${result.data.user.last_name}`,
          photo_url: result.data.user.photo_url,
        });

        toast.success(t_login("user-success-login"));
        router.push(`${locale}/${role}`);
        console.log("Went to page");
      } else {
        toast.error(t_login("user-fail-login"));
      }
    });
  }
  if (token) {
    router.push(`/${locale}/user`);
  }
  if (!token && !tokenLoading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center gap-1.5">
          {steps.map((index) => (
            <span
              key={index}
              className={`h-2 w-6 rounded-full ${
                step === index ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <SelectLang />
        <Swiper
          ref={swiperRef}
          spaceBetween={50}
          slidesPerView={1}
          modules={[Navigation]}
          onSlideChange={(swiper) => setStep(swiper.activeIndex + 1)}
        >
          {steps.map((stepNumber) => (
            <SwiperSlide key={stepNumber}>
              <Step
                image={`/images/i${stepNumber}.png`}
                title={t(`${stepNumber - 1}.title`)}
                description={t(`${stepNumber - 1}.description`)}
                subtext={t(`${stepNumber - 1}.subtext`)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {step < 6 ? (
          <div className="mt-4 flex justify-between">
            <Button
              className={step === 1 ? "invisible" : "visible"}
              variant={"ghost"}
              onClick={prevStep}
              disabled={step === 1}
            >
              {h("prevbtn")}
            </Button>
            <Button
              variant={"ghost"}
              className="gap-2"
              onClick={nextStep}
              disabled={step === 6}
            >
              {h("nextbtn")}
              <ArrowLeft
                className={cn(
                  "size-4 rotate-180",
                  locale === "fa" && "rotate-0",
                  locale === "ar" && "rotate-0"
                )}
              />
            </Button>
          </div>
        ) : (
          <div className="mx-auto mt-2 grid w-64 gap-4">
            <Button onClick={(e) => loginUserAs("user")} variant={"secondary"}>
              {h("userbtn")}
            </Button>
            <Button onClick={(e) => loginUserAs("owner")} variant={"blue"}>
              {h("ownerbtn")}
            </Button>
          </div>
        )}
      </div>
    );
  }
};

const Step = ({
  image,
  title,
  description,
  subtext,
}: {
  image: string;
  title: string;
  description: string;
  subtext: string;
}) => (
  <section className="grid gap-2">
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mx-auto size-60"
    >
      <Image
        fill
        alt=""
        src={image}
        draggable="false"
        className="size-full object-contain"
        loading="eager"
      />
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-balance text-center font-black text-base"
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="text-balance text-center text-xs/6"
    >
      {description}
    </motion.p>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="text-balance text-center font-medium text-blue-400 text-xs/6"
    >
      {subtext}
    </motion.p>
  </section>
);
