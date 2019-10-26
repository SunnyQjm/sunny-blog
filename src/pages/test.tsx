import React from "react";

interface TestPageProps {

}

interface TestPageState {

}

class TestPage extends React.Component<TestPageProps, TestPageState> {
  constructor(props: TestPageProps) {
    super(props);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div>
        test
      </div>
    );
  }
}


export default TestPage;
