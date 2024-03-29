﻿using System;
using System.Collections.Generic;

namespace ReactWeb2.Models
{
    public partial class StudentGrade
    {
        public int EnrollmentId { get; set; }
        public int CourseId { get; set; }
        public int StudentId { get; set; }
        public decimal? Grade { get; set; }

        public Course Course { get; set; }
        public Person Student { get; set; }
    }
}
