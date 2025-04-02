import { IoStar } from 'react-icons/io5';
import { Badge } from '../Badge';
import { Text } from '../Text';
import { TESTIMONIALS } from './config';

export const Testimonials: React.FC = () => {
  return (
    <div className="mx-auto flex flex-col items-center gap-24 px-24 py-100 sm:text-left">
      <Badge>
        <IoStar className="size-16" />
        Testimonials
      </Badge>
      <Text className="max-w-[580px] text-center">
        Why users <span className="text-yellow-dark-11">love using Fleek</span>
      </Text>
      <Text variant="description" className="font-normal">
        Join others in making the agents to ease your life.
      </Text>
      <div className="grid w-full max-w-[800px] gap-24 pt-12 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex flex-col gap-20 rounded-8 border border-gray-dark-6 bg-gray-dark-1 p-12"
          >
            <Text variant="paragraph" className="text-gray-dark-12">
              {testimonial.message}
            </Text>
            <div className="flex items-center gap-12">
              <div className="size-40 rounded-5 bg-gray-dark-6">
                {testimonial.picture && (
                  <img
                    alt={testimonial.name}
                    src={testimonial.picture}
                    width={40}
                    height={40}
                  />
                )}
              </div>
              <div>
                <Text variant="tertiary">{testimonial.name}</Text>
                <Text variant="paragraph" className="text-[1.2rem]">
                  {testimonial.role}
                </Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
