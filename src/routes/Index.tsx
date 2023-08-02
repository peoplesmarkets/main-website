import { useNavigate } from "@solidjs/router";

import { GET_STARTED_PATH } from "../App";

export default function Index() {
  const navigate = useNavigate();
  navigate(GET_STARTED_PATH);

  return <></>;
}
