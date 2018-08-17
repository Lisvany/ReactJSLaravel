<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use App\Task;
use App\User;

class TaskController extends Controller
{

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // dd(User::all());
        $users = Task::all();

        return response()->json($users);
        // response()->json(auth()->user());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // return response()->json(['response' => $request->get('name'). ':' .$request->get('description')]);
        // dd($request->get('name'). ':' .$request->get('description'));

        $task = new Task();
        $task->name= $request->get('name');
        $task->description= $request->get('description');
        $task->user_id = auth()->user()->id;

        $result = null;

        try {
            $task->save();
            $result = response()->json(['response' => 'success']);
        } catch(Exception $e) {
            $result = response()->json(['response' => 'failed', 'error'=> $e]);
        }

       return $result;

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    }

    public function getById($id){

        $task = Task::find($id);

        if($task){
            return  response()->json([ 'response' => 'success', 'data' => $task ]);
        }else{
            return  response()->json([ 'response' => 'failed', 'data' => null ]);
        }
       
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $task = Task::find($id);
        $name = $request->get('name');
        $description = $request->get('description');

        if($task){
            $task->name = $name;
            $task->description = $description;
            
            try{
                $task->save();
                return  response()->json([ 'response' => 'success', 'data' => $task ]);
            }catch(Exception $e){
                return  response()->json([ 'response' => 'Somethings was wrong', 'error' => $e . '\n '.'Error' ]);
            }

        }else{
            return  response()->json([ 'response' => "Don't exist any file with that id", 'data' => null ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task = Task::find($id);

        if($task){
            try{
                $task->delete();
                return  response()->json([ 'response' => 'success' ]);
            }catch(Exception $e){
                return  response()->json([ 'response' => 'Somethings was wrong', 'error' => $e . '\n '.'Error' ]);
            }
        }else{
            return  response()->json([ 'response' => "Don't exist any file with that id", 'data' => null ]);
        }
    }
}
