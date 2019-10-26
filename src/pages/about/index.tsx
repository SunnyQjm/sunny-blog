import React from "react";
import './index.scss'

interface AboutPageProps {

}

interface AboutPageState {

}

class AboutPage extends React.Component<AboutPageProps, AboutPageState> {
  constructor(props: AboutPageProps) {
    super(props);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div>
        About Page
      </div>
    );
  }
}

export default AboutPage
