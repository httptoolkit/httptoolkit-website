export interface StyledTextListProps {
  $lighterText?: boolean;
}

export interface TextListProps extends StyledTextListProps {
  list: string[];
}
