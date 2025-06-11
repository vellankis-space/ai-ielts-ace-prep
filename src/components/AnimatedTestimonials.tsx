
import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  score: string;
};

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}

export const AnimatedTestimonials: React.FC<AnimatedTestimonialsProps> = ({
  testimonials,
  autoplay = false,
  className,
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className={cn("max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="relative h-80 w-full">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.src}
                className={cn(
                  "absolute inset-0 origin-bottom transition-all duration-400 ease-in-out",
                  isActive(index) 
                    ? "opacity-100 scale-100 z-50" 
                    : "opacity-70 scale-95 z-10"
                )}
                style={{
                  transform: isActive(index) 
                    ? 'rotateY(0deg) translateZ(0px)' 
                    : `rotateY(${randomRotateY()}deg) translateZ(-100px)`,
                  zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                }}
              >
                <img
                  src={testimonial.src}
                  alt={testimonial.name}
                  className="h-full w-full rounded-3xl object-cover object-center"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <div
            key={active}
            className="transition-all duration-200 ease-in-out"
          >
            <h3 className="text-2xl font-bold text-foreground">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {testimonials[active].designation}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-sm text-gray-600">Achieved IELTS Score:</span>
              <span className="text-2xl font-bold text-blue-600">{testimonials[active].score}</span>
            </div>
            <p className="text-lg text-muted-foreground mt-8">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <span
                  key={index}
                  className="inline-block transition-all duration-200 ease-in-out"
                  style={{
                    transitionDelay: `${0.02 * index}s`,
                  }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </p>
          </div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group hover:bg-secondary/80 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-foreground group-hover:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group hover:bg-secondary/80 transition-colors"
            >
              <ArrowRight className="h-5 w-5 text-foreground group-hover:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
