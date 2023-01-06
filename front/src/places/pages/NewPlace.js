import React, { useContext } from "react"

import Input from "../../shared/components/FormElements/Input"
import Button from "../../shared/components/FormElements/Button"
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators"
import { useForm } from "../../shared/hooks/form-hook"
import "./PlaceForm.css"
import { useHttpClient } from "../../shared/hooks/http-hook"
import { AuthContext } from "../../shared/context/auth-context"
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner"
import { useHistory } from "react-router-dom"
import ImageUpload from "../../shared/components/FormElements/ImageUpload"

const NewPlace = () => {
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  )

  const history = useHistory()

  const placeSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append("title", formState.inputs.title.value)
      formData.append("description", formState.inputs.description.value)
      formData.append("address", formState.inputs.address.value)
      formData.append("creator", auth.userId)
      formData.append("image", formState.inputs.image.value)
      await sendRequest(
        "http://ec2-52-78-238-204.ap-northeast-2.compute.amazonaws.com/api/places",
        "POST",
        formData
      )
      history.push("/")
    } catch (error) {}
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="제목"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="제목을 제대로 입력해주세요"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="부연설명"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="설명을 제대로 작성해주세요(5자 이상 필수)"
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="주소"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="주소를 제대로 입력해주세요"
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="이미지를 넣어주세요"
        />
        <Button type="submit" disabled={!formState.isValid}>
          장소 추가
        </Button>
      </form>
    </React.Fragment>
  )
}

export default NewPlace
