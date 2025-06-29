import { handleError } from "../helpers/handleError";
import type { IAnimal } from "../models/IAnimal";
import { AnimalHunger } from "./AnimalHunger";

type AnimalPresentationProps = {
  animal: IAnimal;
};
export const AnimalPresentation = (props: AnimalPresentationProps) => {
  return (
    <>
      <div className="image-container">
        <img
          src={props.animal.imageUrl}
          alt={props.animal.name}
          onError={handleError}
        />
      </div>
      <h2>{props.animal.name}</h2>
      <span>{props.animal.shortDescription}</span>
      <AnimalHunger animalId={props.animal.id}></AnimalHunger>
    </>
  );
};
