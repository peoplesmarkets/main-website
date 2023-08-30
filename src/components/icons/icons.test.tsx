import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  cleanupDOM,
  createDOM,
  getNoObj,
  renderIntoRoot,
} from "../../lib/testing";
import { BurgerArrowIcon } from "./BurgerArrowIcon";
import { BurgerIcon } from "./BurgerIcon";
import { CloseIcon } from "./CloseIcon";
import CommunityIcon from "./CommunityIcon";
import { DashboardIcon } from "./DashboardIcon";
import { EditIcon } from "./EditIcon";
import { GitHubIcon } from "./GitHubIcon";
import { LanguageIcon } from "./LanguageIcon";
import { MainLogoIcon } from "./MainLogoIcon";
import { OpenInNewIcon } from "./OpenInNewIcon";
import { RocketLaunchIcon } from "./RocketLaunchIcon";
import { SearchGlobalIcon } from "./SearchGlobalIcon";
import { SearchIcon } from "./SearchIcon";
import { SignInIcon } from "./SignInIcon";
import { StoreFrontIcon } from "./StorefrontIcon";
import { ThemeIcon } from "./ThemeIcon";
import { TrashIcon } from "./TrashIcon";
import { UserSettingsIcon } from "./UserSettingsIcon";
import { ImageIcon } from "./ImageIcon";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("BurgerArrowIcon", () => {
    const { container } = renderIntoRoot(() => <BurgerArrowIcon />);
    expect(container).toBeDefined();
  });
  test("BurgerIcon", () => {
    const { container } = renderIntoRoot(() => <BurgerIcon />);
    expect(container).toBeDefined();
  });
  test("CloseIcon", () => {
    const { container } = renderIntoRoot(() => <CloseIcon />);
    expect(container).toBeDefined();
  });
  test("CommunityIcon", () => {
    const { container } = renderIntoRoot(() => <CommunityIcon />);
    expect(container).toBeDefined();
  });
  test("DashboardIcon", () => {
    const { container } = renderIntoRoot(() => <DashboardIcon />);
    expect(container).toBeDefined();
  });
  test("EditIcon", () => {
    const { container } = renderIntoRoot(() => <EditIcon />);
    expect(container).toBeDefined();
  });
  test("GitHubIcon", () => {
    const { container } = renderIntoRoot(() => (
      <GitHubIcon class="" theme={getNoObj} />
    ));
    expect(container).toBeDefined();
  });
  test("ImageIcon", () => {
    const { container } = renderIntoRoot(() => <ImageIcon />);
    expect(container).toBeDefined();
  });
  test("LanguageIcon", () => {
    const { container } = renderIntoRoot(() => <LanguageIcon />);
    expect(container).toBeDefined();
  });
  test("MainLogoIcon", () => {
    const { container } = renderIntoRoot(() => <MainLogoIcon />);
    expect(container).toBeDefined();
  });
  test("OpenInNewIcon", () => {
    const { container } = renderIntoRoot(() => <OpenInNewIcon />);
    expect(container).toBeDefined();
  });
  test("RocketLaunchIcon", () => {
    const { container } = renderIntoRoot(() => <RocketLaunchIcon />);
    expect(container).toBeDefined();
  });
  test("SearchGlobalIcon", () => {
    const { container } = renderIntoRoot(() => <SearchGlobalIcon />);
    expect(container).toBeDefined();
  });
  test("SearchIcon", () => {
    const { container } = renderIntoRoot(() => <SearchIcon />);
    expect(container).toBeDefined();
  });
  test("SignInIcon", () => {
    const { container } = renderIntoRoot(() => <SignInIcon />);
    expect(container).toBeDefined();
  });
  test("StoreFrontIcon", () => {
    const { container } = renderIntoRoot(() => <StoreFrontIcon />);
    expect(container).toBeDefined();
  });
  test("ThemeIcon", () => {
    const { container } = renderIntoRoot(() => <ThemeIcon theme={getNoObj} />);
    expect(container).toBeDefined();
  });
  test("TrashIcon", () => {
    const { container } = renderIntoRoot(() => <TrashIcon />);
    expect(container).toBeDefined();
  });
  test("UserSettingsIcon", () => {
    const { container } = renderIntoRoot(() => <UserSettingsIcon />);
    expect(container).toBeDefined();
  });
});
