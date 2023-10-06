import { CartStore } from '@store/CartStore/CartStore';
import DropdownStore from '@store/MultiDropdownStore/MultiDropdownStore';
import QueryParamsStore from '@store/RootStore/QueryParamsStore';

export default class RootStore {
  readonly query = new QueryParamsStore();

  readonly cart = new CartStore();

  readonly dropdown = new DropdownStore();
}
