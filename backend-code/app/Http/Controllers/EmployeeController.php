<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Employee;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\Empty_;

class EmployeeController extends Controller
{
  public function index(Request $request){
    $query = Employee::leftJoin('departments', 'employees.department_id', '=', 'departments.id')
        ->select('employees.*', 'departments.name as department_name')
        ->orderBy('id','ASC');

    if ($request->has('search')) {
        $name = $request->input('query');
        if ($name) {
            $query->where('employees.firstname', 'ILIKE', '%' . $name . '%');
        }
    }
    
    $employees = $query->paginate(10);
    
    $departments = Department::all();
    
    $data = [
        'employees' => $employees,
        'departments' => $departments
    ];
    
    return response()->json($data);
}

    public function show(Employee $employee){
        $departments = Department::all();
        $data = [
          'employee'=>$employee,
          'departments'=>$departments
      ];
        return response()->json($data);
    }
    
    public function destroy(Employee $employee){
        $employee->delete();
        return response()->json('Employee deleted successfully');
        
    }
    public function updateStatus(Request $request,Employee $employee){

        $employee->update(['is_active' => $request->is_active]);
        return response()->json($employee);
     }
     
     public function store(Request $request){
        $data = $this->validate($request, [
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required|unique:employees,email',
            'emp_id' => 'required',
            'department_id' => 'required'
    
          ]);
          $vars = array(
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            'email' => $data['email'],
            'emp_id' => $data['emp_id'],
            'timezone' => $request->timezone,
            'country' => $request->country,
            'department_id' => $data['department_id'],
            'phone' => $request->phone,
            'languages' => json_encode($request->langs), // Convert array to JSON string
            'skills' => json_encode($request->skills), // Convert array to JSON string
            'is_active' => 1,
            
          );
          $employee = Employee::create($vars);
          return response()->json($employee);

         
     }
     public function update(Request $request,Employee $employee){
        $data = $this->validate($request, [
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required|unique:employees,email,'.$employee->id,
            'emp_id' => 'required',
            'department_id' => 'required'
    
          ]);
          $vars = array(
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            'email' => $data['email'],
            'emp_id' => $data['emp_id'],
            'timezone' => $request->timezone,
            'country' => $request->country,
            'department_id' => $data['department_id'],
            'phone' => $request->phone,
            'languages' => json_encode($request->langs), // Convert array to JSON string
            'skills' => json_encode($request->skills), // Convert array to JSON string
            'is_active' => 1,
            
          );
          $employee->update($vars);
          return response()->json($employee);

         
     }
}