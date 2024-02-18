<?php

use App\Http\Controllers\DepartmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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