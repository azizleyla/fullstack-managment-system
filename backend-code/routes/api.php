<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use PhpParser\Node\Expr\Empty_;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::prefix('departments')
->group(function(){
    Route::get('/index', [DepartmentController::class, 'index']);
    Route::post('/destroy/{department}', [DepartmentController::class, 'destroy']);
    Route::post('store',[DepartmentController::class,'store']);
    Route::post('update/{department}',[DepartmentController::class,'update']);
    Route::post('update-status/{department}',[DepartmentController::class,'updateStatus']);
    Route::post('destroy-ids',[DepartmentController::class,'destroyIds']);

});
Route::prefix('employees')
->group(function(){
    Route::get('/index', [EmployeeController::class, 'index']);
    Route::post('destroy/{employee}', [EmployeeController::class, 'destroy']);
    Route::post('update-status/{employee}', [EmployeeController::class, 'updateStatus']);
    Route::post('store', [EmployeeController::class, 'store']);
    Route::get('/{employee}', [EmployeeController::class, 'show']);

    Route::post('update/{employee}', [EmployeeController::class, 'update']);

});