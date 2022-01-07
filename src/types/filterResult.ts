import { AxiosResponse } from "axios";

export type FilterResult = {
  dirty: AxiosResponse[], // Responses that still dirty, need to filter more
  qualified: AxiosResponse[], // Responses that is qualified as strange, will output these responses
}
