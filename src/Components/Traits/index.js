import React from "react";

const Traits = () => (
  <div className="traits">
    <h2 className="homepage__h2">Character Trait Generator</h2>
    <p className="homepage__p">
      Confused as to who your character actually is beyond the stats? Never
      fear! The EverLore Character Generator will quickly fill you with ideas.
    </p>

    <label>
      <input type="text" name="traitName" className="ut-no-print" />
      <div className="ut-no-screen print-text-input ut-text-cursive ">name</div>
      <br />
      <span className="label">Character Name</span>
    </label>
    <label>
      <input type="text" name="traitTitle" className="ut-no-print" />
      <div className="ut-no-screen print-text-input ut-text-cursive ">
        title
      </div>
      <br />
      <span className="label">Character Title</span>
    </label>
    <label>
      <input type="text" name="traitFrom" className="ut-no-print" />
      <div className="ut-no-screen print-text-input ut-text-cursive ">From</div>
      <br />
      <span className="label">Character Is From</span>
    </label>
    <label>
      <input type="text" name="traitTrait1" className="ut-no-print" />
      <div className="ut-no-screen print-text-input ut-text-cursive ">
        Trait 1
      </div>
      <br />
      <span className="label">Trait 1</span>
    </label>
    <label>
      <input type="text" name="traitTrait1" className="ut-no-print" />
      <div className="ut-no-screen print-text-input ut-text-cursive ">
        Trait 2
      </div>
      <br />
      <span className="label">Trait 2</span>
    </label>
    <label>
      <input type="text" name="traitTrait1" className="ut-no-print" />
      <div className="ut-no-screen print-text-input ut-text-cursive ">
        Trait 3
      </div>
      <br />
      <span className="label">Trait 3</span>
    </label>
  </div>
);

export default Traits;
