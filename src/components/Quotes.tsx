export const Quotes = () => {
  return (
    <>
      <blockquote className="relative p-4 text-xl italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-500 quote">
        <p className="mb-4">
          “The customer service I received was exceptional. The support team
          went above and beyond to address my concerns.”
        </p>
        <cite className="flex items-center">
          <span className="font-bold">Jules Winnfield</span>
          <span className="ml-1 text-sm font-normal text-neutral-500">
            CEO, Acme Inc
          </span>
        </cite>
      </blockquote>
    </>
  );
};
