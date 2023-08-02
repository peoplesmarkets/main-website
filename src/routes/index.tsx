import { useNavigate } from "solid-start";

import { GET_STARTED_PATH } from "~/root";

export default function Index() {
  const navigate = useNavigate();
  navigate(GET_STARTED_PATH);
}
