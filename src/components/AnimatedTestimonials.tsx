
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

  const getCardStyle = (index: number) => {
    const isCurrentActive = isActive(index);
    const diff = index - active;
    const totalCards = testimonials.length;
    
    // Normalize the difference to handle wrapping
    const normalizedDiff = diff > totalCards / 2 ? diff - totalCards : diff < -totalCards / 2 ? diff + totalCards : diff;
    
    if (isCurrentActive) {
      return {
        transform: 'rotateY(0deg) translateZ(0px) translateX(0px)',
        zIndex: 999,
        opacity: 1,
        scale: 1
      };
    } else if (normalizedDiff === 1 || normalizedDiff === -totalCards + 1) {
      // Next card (right side)
      return {
        transform: 'rotateY(-15deg) translateZ(-80px) translateX(20px)',
        zIndex: totalCards - Math.abs(normalizedDiff),
        opacity: 0.7,
        scale: 0.95
      };
    } else if (normalizedDiff === -1 || normalizedDiff === totalCards - 1) {
      // Previous card (left side)
      return {
        transform: 'rotateY(15deg) translateZ(-80px) translateX(-20px)',
        zIndex: totalCards - Math.abs(normalizedDiff),
        opacity: 0.7,
        scale: 0.95
      };
    } else {
      // Cards further away
      return {
        transform: `rotateY(${normalizedDiff > 0 ? -25 : 25}deg) translateZ(-120px) translateX(${normalizedDiff > 0 ? 40 : -40}px)`,
        zIndex: totalCards - Math.abs(normalizedDiff),
        opacity: 0.4,
        scale: 0.9
      };
    }
  };

  return (
    <div className={cn("max-w-sm md:max-w-5xl mx-auto px-4 md:px-8 lg:px-12 py-20", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <div className="relative h-96 md:h-[500px] w-full perspective-1000">
            {testimonials.map((testimonial, index) => {
              const cardStyle = getCardStyle(index);
              return (
                <div
                  key={testimonial.src}
                  className="absolute inset-0 origin-bottom transition-all duration-500 ease-in-out"
                  style={{
                    transform: cardStyle.transform,
                    zIndex: cardStyle.zIndex,
                    opacity: cardStyle.opacity,
                  }}
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    className="h-full w-full rounded-3xl object-cover object-center shadow-2xl"
                    draggable={false}
                    style={{
                      transform: `scale(${cardStyle.scale})`,
                      transition: 'transform 0.5s ease-in-out'
                    }}
                  />
                </div>
              );
            })}
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
