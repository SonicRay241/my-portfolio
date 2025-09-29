export default function SpanWords(props: { text: string }) {
  const words = props.text.split(" ");

  return (
    <>
      {words.map((v, k) => {
        return (
          <span className="inline-block" key={k}>
            {v}
            {k < words.length - 1 && "\u00A0"}
          </span>
        );
      })}
    </>
  );
}