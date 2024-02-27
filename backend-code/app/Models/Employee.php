<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'country',
        'languages',
        'skills',
        'phone',
        'emp_id',
        'department_id',
        'timezone',
        'is_active'
    ];
}