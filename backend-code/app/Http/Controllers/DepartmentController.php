<?php

namespace App\Http\Controllers;
use App\Models\Department;
use Illuminate\Http\Request;
use PHPUnit\Framework\Attributes\Depends;

class DepartmentController extends Controller
{
    public function index(Request $request){
        $query = Department::orderBy('id', 'asc');

        if ($request->has('search')) {
            $name = $request->input('query');
            if ($name) {
                $query->where('name', 'like', '%' . $name . '%');
            }
        }

        $limit = $request->input('limit', 10); // Default limit is 10
        $departments = $query->paginate($limit);
        return response()->json($departments);

    }
    public function destroy(Request $request,Department $department){
        $department->delete();
        return response()->json("Department deleted successfully");
    }
    public function destroyIds(Request $request){
        $ids = $request->input('ids');
        Department::whereIn('id', $ids)->delete();

    }
    
    public function store(Request $request){
        $data = $this->validate($request,[
            'name'=>'required'
        ]);
        $vars = array(
            'name'=>$data['name'],
            "is_active"=> $request->is_active
        );
        $department = Department::create($vars);
        return response()->json($department);
    }
    public function update(Request $request,Department $department){
        $data = $this->validate($request,[
            'name'=>'required'
        ]);
        $vars = array(
            'name'=>$data['name'],
            "is_active"=> $request->is_active

        );
        $department->update($vars);
        return response()->json($department);
    }
    public function updateStatus(Request $request,Department $department){

       $department->update(['is_active' => $request->is_active]);
       return response()->json($department);
    }
}