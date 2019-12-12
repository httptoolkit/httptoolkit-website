import { styled, media } from '../../styles';

export const FeatureCardsBlock = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 60px 0;

  ${media.mobile`
    margin-top: 60px;
    flex-direction: column;
  `}

  ${media.tablet`
    padding: 0 10px;
  `}

  ${media.desktopOrTablet`
    > :first-child {
      margin-left: 0;
    }

    > :last-child {
      margin-right: 0;
    }
  `}
`;

export const FeaturesCard = styled.section`
  flex: 1;
  margin: 0 8px;

  ${media.mobile`
    :not(:last-child) {
      margin-bottom: 60px;
    }
  `}

  padding: 0;
  background-color: ${p => p.theme.popBackground};

  border-radius: 4px;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);

  position: relative;

  > h3 {
    padding: 33px 30px 0;
    ${p => p.theme.fontSizeSubheading};
    color: ${p => p.theme.popColor};

    border-radius: 4px 4px 0 0;

    font-weight: bolder;
    text-transform: uppercase;
  }

  > svg {
    position: absolute;
    top: 21px;
    right: 21px;
    height: 48px;
    color: ${p => p.theme.containerBackground};

  }

  > p {
    ${p => p.theme.fontSizeText};
    line-height: 1.45;

    margin: 30px 30px;

    color: ${p => p.theme.mainColor};
  }
`;