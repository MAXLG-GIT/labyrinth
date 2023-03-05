<!DOCTYPE html>
<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link rel="stylesheet" href="./common.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    <script type="module">
        import {
            main
        } from './main.js';
        main();
    </script>
    <title>Labyrinth</title>
</head>
<body>
    <h1>Labyrinth</h1>
    <div class="form-group row">
        <div class="col-2">
            <form method="get" action="/">
                <div class="mb-3">
                    <label for="rowsQty" class="form-label">Rows quantity</label>
                    <input type="number" min=1 class="form-control" id="rowsQty" name="rowsQty" value="<?= $_GET['rowsQty'] ?? 5 ?>">
                </div>
                <div class="mb-3">
                    <label for="colsQty" class="form-label">Columns quantity</label>
                    <input type="number" min=1 class="form-control" id="colsQty" name="colsQty" value="<?= $_GET['colsQty'] ?? 5 ?>">
                </div>

                <button type="submit" class="btn btn-primary">Update</button>
            </form>
        </div>
        <div class="col-3">
        <label class="form-label">Points</label>
                <div class="mb-3">
                    
                    <button type="button" class="btn btn-primary" disabled id="setStartBtn">Set start</button>
                    <button type="button" class="btn btn-primary" disabled id="setFinishBtn">Set finish</button>
                </div>
                <label class="form-label">Path</label>
                <div class="mb-3">
                
                    <button type="button" class="btn btn-primary" id="clearPathBtn">Clear</button>
                    <button type="button" class="btn btn-primary" disabled id="makePathBtn">Make path</button>
                </div>
                <div >
                    <label class="form-label fw-bold sumWarpper" >Total sum: <span></span></label>
                    <label class="form-label fw-bold text-danger ps-3 errorWarpper" ></label>
                 </div>
        </div>
    </div>
    <br />
    <br />
    <table class="table table-bordered w-auto labyrinth-table">
        <tbody>
            <?
            for ($row = 0; $row < ($_GET['rowsQty'] ?? 5); $row++) {
            ?>
                <tr>
                    <?
                    for ($col = 0; $col < ($_GET['colsQty'] ?? 5); $col++) {
                    ?>
                        <td>
                            <input type="text" maxlength="1" id="number[<?= $row ?>][<?= $col ?>]" class="bg-transparent border-0 number-input" value="<?= rand(0, 9) ?>" >
                        </td>
                    <?
                    }
                    ?>
                </tr>
            <?
            }
            ?>
        </tbody>
    </table>
</body>
</html>