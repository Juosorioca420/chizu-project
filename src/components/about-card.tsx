import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

interface AboutCardProp {
  title: string;
  subTitle?: string;
  description: string;
  buttonText?: string;
  onClick?: () => void;
}

export function AboutCard({
  title,
  subTitle,
  description,
}: AboutCardProp) {
  return (
    <Card shadow={true} className="hover:shadow-xl transition-shadow duration-300">
      <CardBody className="h-[300px] p-5 flex flex-col justify-center items-center rounded-2xl bg-gray-900">
        {subTitle && (
          <Typography variant="h6" className="mb-4 text-center" color="white">
            {subTitle}
          </Typography>
        )}
        <Typography variant="h4" className="text-center text-white">
          {title}
        </Typography>
        <Typography
          color="white"
          className="mt-2 mb-10 text-base w-full lg:w-8/12 text-center font-normal text-xl"
        >
          {description}
        </Typography>
      </CardBody>
    </Card>
  );
}


export default AboutCard;