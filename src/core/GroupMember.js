import React from 'react'

function GroupMemeber() {
    return (
    <div className="container my-5">
        <div className="row">
        <div className="col-12 col-md-6 mx-auto">
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
           <li class="nav-item" role="presentation">
                <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Code Group</button>
           </li>
           <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Group Member</button>
           </li>

        </ul>
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
            <form>
                <div class="mb-3">
                  <label for="code" class="form-label">Create Code :</label>
                  <input type="text" class="form-control" id="code" aria-describedby="emailHelp"/>
                </div>
                <div class="d-grid">
                <button type="submit" class="btn btn-primary">Create Code</button>
                </div>
              </form>
            </div>


            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
            <form>
                <div class="mb-3">
                  <label for="code" class="form-label"> Group Member:</label>
                  <input type="text" class="form-control" id="code" aria-describedby="emailHelp"/>
                </div>
                <div class="mb-3">
                  <label for="code" class="form-label">Create Code :</label>
                  <input type="text" class="form-control" id="code" aria-describedby="emailHelp"/>
                </div>

                <div class="d-grid">
                <button type="submit" class="btn btn-primary">Create Code</button>
                </div>
              </form>
            </div>
        </div>
        </div>
        </div>
    </div>
    )
}

export default GroupMemeber
