export const HighlightedText = ({ title }: { title: string }) =>
  title.split('*').map((segment, index) => {
    if (segment.length === 0) return null;

    const isHighlighted = index % 2 === 1;
    if (!isHighlighted) return segment;
    return <span key={index}>{ segment }</span>;
  });
