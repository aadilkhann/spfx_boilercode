/* eslint-disable no-empty-pattern */
import * as React from "react";
import type { IPracticeProps } from "./IPracticeProps";
import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import TestComponent from "./TestComponent";

export default class Practice extends React.Component<IPracticeProps, {}> {
  componentDidMount(): void {
    sp.setup({
      sp: {
        baseUrl: "https://cubicdirect.sharepoint.com/sites/adil", // Replace with your SharePoint site URL
      },
    });
  }
  public render(): React.ReactElement<IPracticeProps> {
    const {
      // description,
      // isDarkTheme,
      // environmentMessage,
      // hasTeamsContext,
      // userDisplayName,
      // context
    } = this.props;

    return (
      <section>
        <TestComponent />
      </section>
    );
  }
}
