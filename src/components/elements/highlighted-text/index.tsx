export const HighlightedText = ({ title }: { title: string }) =>
  title.split('`').map((segment, index) => {
    const isHighlighted = segment.includes('*');
    if (!isHighlighted) {
      return segment;
    }
    return <span key={index}>{segment.replaceAll('*', '')}</span>;
  });
