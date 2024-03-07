export const HighlightedText = ({ title }: { title: string }) =>
  title.split('`').map(segment => {
    const isHighlighted = segment.includes('*');
    if (!isHighlighted) {
      return segment;
    }
    return <span>{segment.replaceAll('*', '')}</span>;
  });
