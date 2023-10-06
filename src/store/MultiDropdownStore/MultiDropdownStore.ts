import { makeAutoObservable } from 'mobx';

export type Option = {
  key: string;
  value: string;
};

class DropdownStore {
  isOpen = false;

  isTyping = false;

  filter = '';

  value: Option[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setOpen(value: boolean) {
    this.isOpen = value;
  }

  setTyping(value: boolean) {
    this.isTyping = value;
  }

  setFilter(value: string) {
    this.filter = value;
  }

  setValue(options: Option[]) {
    this.value = options;
  }

  toggleOption(option: Option) {
    if (this.value.some((o) => o.key === option.key)) {
      this.value = this.value.filter((o) => o.key !== option.key);
    } else {
      this.value.push(option);
    }
  }

  reset() {
    this.isOpen = false;
    this.isTyping = false;
    this.filter = '';
  }
}

export default DropdownStore;
