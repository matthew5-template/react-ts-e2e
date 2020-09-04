interface Props {
  optionalChaining?: {
    prop?: {
      child: string
    }
  }
}

const optionalChaining = (props: Props) => {
  console.log('optionalChaining', props?.optionalChaining?.prop?.child)
}

export default optionalChaining
