export type NumericFormValue = number | ''

export interface CoffeeEntryForm {
  brand: string
  beans: string
  roast: string
  weight: NumericFormValue
  grind_size: NumericFormValue
  yield: NumericFormValue
  time: NumericFormValue
  equipment: string
  remarks: string
  roaster_remarks: string
}

export interface CoffeeEntry extends CoffeeEntryForm {
  _id: string
  date: string
}

export interface CoffeeEntryUpdate {
  id: string
  body: CoffeeEntry
}

export const createEmptyCoffeeEntryForm = (): CoffeeEntryForm => ({
  brand: '',
  beans: '',
  roast: '',
  weight: '',
  grind_size: '',
  yield: '',
  time: '',
  equipment: '',
  remarks: '',
  roaster_remarks: '',
})

export const createEmptyCoffeeEntry = (): CoffeeEntry => ({
  _id: '',
  date: '',
  ...createEmptyCoffeeEntryForm(),
})
